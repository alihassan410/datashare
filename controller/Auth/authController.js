const Joi = require('joi');
const Admin = require('../../models/admin');
const bcrypt = require('bcryptjs');
const AdminDTO = require('../../dto/admin');
const JWTService = require('../../services/JWTservice');
const RefreshToken = require('../../models/token');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {
    async register(req, res, next) {
        const adminRegisterSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
                'any.only': 'Passwords do not match'
            })
        });

        const { error } = adminRegisterSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { username, email, password } = req.body;

        try {
            const emailTaken = await Admin.exists({ email });
            const usernameTaken = await Admin.exists({ username });

            if (emailTaken) {
                return res.status(409).json({ message: 'Email already registered, use another' });
            }

            if (usernameTaken) {
                return res.status(409).json({ message: 'Username already registered, use another' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const admin = new Admin({
                username,
                email,
                password: hashedPassword
            });

            const user = await admin.save();

            const accessToken = JWTService.signAccessToken({ _id: user._id }, '30m');
            const refreshToken = JWTService.signRefreshToken({ _id: user._id }, '60m');

            await JWTService.storeRefreshToken(refreshToken, user._id);

            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 30, // 30 minutes
                httpOnly: true
            });

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                httpOnly: true
            });

            const adminDTO = new AdminDTO(user);
            return res.status(201).json({ user: adminDTO, auth: true });
        } catch (error) {
            return next(error);
        }
    },
    async GetUserById(req, res, next) {
        try {
            let user = await Admin.findOne({ _id: req.params.id });
            return res.json(user);
        } catch (error) {
            console.log(error);
        }
    },
    async EditUser(req, res, next) {
        const { email, name, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            let newUser = await Admin.findOneAndUpdate({ email }, { username: name, password: hashedPassword });
            return res.json({ test: "sample" });
        } catch (error) {
            console.log(error, "EditUser")
        }
    }
    ,
    async login(req, res, next) {
        const adminLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required()
        });

        const { error } = adminLoginSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { email, password } = req.body;
        try {
            const user = await Admin.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const matched = await bcrypt.compare(password, user.password);
            if (!matched) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const accessToken = JWTService.signAccessToken({ _id: user._id }, '30m');
            const refreshToken = JWTService.signRefreshToken({ _id: user._id }, '60m');

            await RefreshToken.updateOne({ _id: user._id }, { token: refreshToken }, { new: true });

            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 30, // 30 minutes
                httpOnly: true
            });

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                httpOnly: true
            });

            const adminDTO = new AdminDTO(user);
            return res.status(200).json({ user: adminDTO, auth: true });
        } catch (error) {
            return next(error);
        }
    },

    async logout(req, res, next) {
        const { refreshToken } = req.cookies;
        try {
            await RefreshToken.deleteOne({ token: refreshToken });
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.status(200).json({ user: null, auth: false });
        } catch (error) {
            return next(error);
        }
    },

    async refresh(req, res, next) {

        const originalRefreshToken = req.cookies.refreshToken;

        let id;

        try {
            id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
        } catch (e) {
            const error = {
                status: 401,
                message: "Unauthorized",
            };

            return next(error);
        }

        try {
            const match = RefreshToken.findOne({
                _id: id,
                token: originalRefreshToken,
            });

            if (!match) {
                const error = {
                    status: 401,
                    message: "Unauthorized",
                };

                return next(error);
            }
        } catch (e) {
            return next(e);
        }

        try {
            const accessToken = JWTService.signAccessToken({ _id: id }, "30m");

            const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");

            await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

            res.cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            });

            res.cookie("refreshToken", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            });
        } catch (e) {
            return next(e);
        }

        const user = await Admin.findOne({ _id: id });

        const userDto = new AdminDTO(user);

        return res.status(200).json({ user: userDto, auth: true });
    },

    async deleteAdmin(req, res, next) {
        console.log(req.params);
        const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
        const deleteAdminSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required(),
        });
        console.log(req.params.id)
        try {
            const { error } = deleteAdminSchema.validate(req.params);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { id } = req.params;

            const admin = await Admin.findById(id);
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            await Admin.deleteOne({ _id: id });
            await RefreshToken.deleteOne({ _id: id });

            return res.status(200).json({ message: 'Admin deleted successfully' });
        } catch (error) {
            return next(error);
        }
    },

    async editAdmin(req, res, next) {
        const adminEditSchema = Joi.object({
            username: Joi.string().min(5).max(30),
            email: Joi.string().email(),
            password: Joi.string().pattern(passwordPattern),
            confirmPassword: Joi.any().valid(Joi.ref('password')).messages({
                'any.only': 'Passwords do not match'
            })
        });

        const { error } = adminEditSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { username, email, password } = req.body;
        const { userId } = req.params;

        try {
            const user = await Admin.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            if (email && email !== user.email) {
                const emailTaken = await Admin.exists({ email });
                if (emailTaken) {
                    return res.status(409).json({ message: 'Email already registered, use another' });
                }
            }

            if (username && username !== user.username) {
                const usernameTaken = await Admin.exists({ username });
                if (usernameTaken) {
                    return res.status(409).json({ message: 'Username already registered, use another' });
                }
            }

            const updates = {};
            if (username) updates.username = username;
            if (email) updates.email = email;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updates.password = hashedPassword;
            }

            const updatedUser = await Admin.findByIdAndUpdate(userId, updates, { new: true });
            const adminDTO = new AdminDTO(updatedUser);

            return res.status(200).json({ user: adminDTO, message: 'Admin account updated successfully' });
        } catch (error) {
            return next(error);
        }
    },
    async getAllAdmin(req, res, next) {
        try {
            const admins = await Admin.find({});

            const adminsDto = [];

            for (let i = 0; i < admins.length; i++) {
                const dto = new AdminDTO(admins[i]);
                adminsDto.push(dto);
            }

            return res.status(200).json({ admins: adminsDto });
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = authController;
