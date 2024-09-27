const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreply.digiwell@gmail.com',
        pass: 'uoqmecjjmbctjowk',
    },
});

exports.sendOtpEmail = functions.https.onCall(async (data, context) => {
    const email = data.email;
    const otp = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');

    const mailOptions = {
        from: 'noreply.digiwell@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text:
            `Your One-Time Password (OTP) is: ${otp}
` +
            '\n' +
            'This OTP is valid for 10 minutes. Please use it to complete your Registration/Login process.\n' +
            '\n' +
            'Thank you,\n' +
            'DigiWell Team\n' +
            '\n',
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);

        await admin
            .firestore()
            .collection('otps')
            .doc(email)
            .set({
                otp: otp,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                expiresAt: admin.firestore.Timestamp.fromDate(
                    new Date(Date.now() + 10 * 60000),
                ), // the otp be valid for 10 minutes, haven't tested this code yet. My impatient ass can't wait for 10 minutes
            });
        console.log(`OTP ${otp} stored for ${email}`);
        return {success: true};
    } catch (error) {
        console.error('Error sending OTP', error);
        throw new functions.https.HttpsError(
            'unknown',
            'Failed to send OTP',
            error,
        );
    }
});

exports.verifyOtp = functions.https.onCall(async (data, context) => {
    const {email, otp} = data;

    if (!email || !otp) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'Email and OTP must be provided.',
        );
    }

    try {
        const otpDoc = await admin.firestore().collection('otps').doc(email).get();
        if (!otpDoc.exists) {
            console.log(`OTP not found for ${email}`);
            throw new functions.https.HttpsError('not-found', 'OTP not found.');
        }

        const {otp: storedOtp, expiresAt} = otpDoc.data();
        console.log(
            `Stored OTP for ${email}: ${storedOtp}, expires at ${expiresAt.toDate()}`,
        );

        if (otp !== storedOtp) {
            console.log(`Invalid OTP for ${email}`);
            throw new functions.https.HttpsError('invalid-argument', 'Invalid OTP.');
        }

        if (expiresAt.toDate() < new Date()) {
            console.log(`Expired OTP for ${email}`);
            throw new functions.https.HttpsError(
                'deadline-exceeded',
                'OTP has expired.',
            );
        }

        console.log(`OTP verified for ${email}`);
        await otpDoc.ref.delete();
        return {success: true};
    } catch (error) {
        console.error('Error verifying OTP', error);
        throw new functions.https.HttpsError(
            'unknown',
            'Failed to verify OTP',
            error,
        );
    }
});

exports.sendWelcomeMail = functions.https.onCall(async (data, context) => {
    const email = data.email;

    const mailOptions = {
        from: 'noreply.digiwell@gmail.com',
        to: email,
        subject: 'Welcome to DigiWell',
        text: 'Your account has been successfully registered on DigiWell.',
    };

    try {
        await transporter.sendMail(mailOptions);
        return {success: true};
    } catch (error) {
        throw new functions.https.HttpsError(
            'unknown',
            'Failed to send welcome Email',
            error,
        );
    }
});

exports.sendPasswordResetOtp = functions.https.onCall(async (data, context) => {
    const email = data.email;
    const otp = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');

    const mailOptions = {
        from: 'noreply.digiwell@gmail.com',
        to: email,
        subject: 'DigiWell Password Reset',
        text: `The OTP to reset password is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        await admin
            .firestore()
            .collection('passwordResetOtps')
            .doc(email)
            .set({
                otp: otp,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                expiresAt: admin.firestore.Timestamp.fromDate(
                    new Date(Date.now() + 10 * 60000),
                ), // the otp be valid for 10 minutes, haven't tested this code yet. My impatient ass can't wait for 10 minutes
            });
        return {success: true};
    } catch (error) {
        throw new functions.https.HttpsError(
            'unknown',
            'Failed to send OTP for password reset',
            error,
        );
    }
});

exports.verifyPasswordResetOtp = functions.https.onCall(
    async (data, context) => {
        const {email, otp} = data;

        if (!email || !otp) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                'Email/OTP must be provided'
            );
        }

        try {
            const otpDoc = await admin
                .firestore()
                .collection('passwordResetOtps')
                .doc(email)
                .get();

            if (!otpDoc.exists) {
                throw new functions.https.HttpsError(
                    'OTP not found',
                    'OTP not found',
                );
            }

            const {otp: storedOtp, expiresAt} = otpDoc.data();

            if (otp !== storedOtp) {
                throw new functions.https.HttpsError(
                    'invalid-argument',
                    'Invalid OTP'
                );
            }

            if (expiresAt.toDate() < new Date()) {
                throw new functions.https.HttpsError(
                    'deadline-exceeded',
                    'OTP Expired'
                );
            }

            await otpDoc.ref.delete();
            return {success: true};

        } catch (error) {
            throw new functions.https.HttpsError(
                'unknown',
                'Failed to verify OTP',
            );
        }
    },
);
