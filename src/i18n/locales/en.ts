import { all } from "axios";

export default {
    welcome_back: "Welcome back",
    common: {
        confirm: "Confirm",
        cancel: "Cancel",
        done: "Done",
        loading: "Loading...",
        empty: "No data",
        logout: "Logout",
        save: "Save",
        edit: "Edit",
        reset: "Reset",
        apply: "Apply",
        keyword: "Keyword",
        enterKeyword: "Enter keyword...",
        back: "Back",
        delete: "Delete",
        createSuccess: "Created successfully",
        updateSuccess: "Updated successfully",
        deleteSuccess: "Deleted successfully",
        confirmDeleteTitle: "Confirm Deletion",
        confirmDeleteMessage: "Are you sure you want to delete this item?",
        action: "Action"
    },

    notification: {
        title: "Notification",
        empty: "No notifications yet",
        loginSuccess: "Login successful",
        welcomeBack: "Welcome back to the system",
        systemUpdate: "System update",
        maintenance: "System maintenance at {{time}}",
        read: "Mark as read",
        delete: "Delete"
    },

    datePicker: {
        selectDate: "Select date",
        mode: {
            date: "Date",
            time: "Time",
            month: "Month",
            year: "Year",
        },
    },
    tab: {
        home: "Home",
        search: "Search",
        notification: "Notification",
        menu: "Menu",
        profile: "Profile",
        settings: "Settings",
        help: "Help & Support",
        security: "Security",
        language: "Language",
        theme: "Theme",
        feedback: "Feedback",
        terms: "Terms of Service",
        privacy: "Privacy Policy",
        about: "About Us",
        deleteAccount: "Delete Account",
        privacyPolicy: "Privacy Policy",
    },
    settings: {
        account: "Account",
        changePassword: "Change Password",
        security: "Security",
        system: "System",
        language: "Language",
        currentPasswordPlaceholder: "Enter current password",
        currentPassword: "Current Password",
        newPassword: "New Password",
        newPasswordPlaceholder: "Enter new password",
        passwordRequirements: "Password requirements:",
        minimumLength: "At least 6 characters",
        hasNumber: "At least 1 number",
        hasSpecialChar: "At least 1 special character",
        hasLetter: "At least 1 letter",
    },
    profile: {
        name: "Full Name",
        email: "Email",
        updateProfileSuccess: "Update profile successfully",

    },
    login: {
        email: "Email",
        password: "Password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot Password ?",
        login: "Login",
        dontHaveAccount: "Don’t have an account? ",
        signUp: "Sign Up",
        getStarted: "Get Started",
        createAccountOrLogin: "Create an account or login to explore our app",
        signInWithGoogle: "Sign in with Google",
        signInWithFacebook: "Sign in with Facebook",
        or: "OR",
        pleaseEnterAllInfo: "Please enter all required information",
        loginFailed: "Login failed",

    },
    signup: {
        createAccount: "Create Account",
        alreadyHaveAccount: "Already have an account? ",
        login: "Login",
        name: "Full Name",
        firstName: "First Name",
        firstNamePlaceholder: "Enter your first name",
        lastNamePlaceholder: "Enter your last name",
        emailPlaceholder: "Enter your email",
        passwordPlaceholder: "Enter your password",
        confirmPassword: "Confirm Password",
        confirmPasswordPlaceholder: "Re-enter your password",
        birthDatePlaceholder: "Select your birth date",
        phoneNumberPlaceholder: "Enter your phone number",
        lastName: "Last Name",
        email: "Email",
        birthDate: "Birth Date",
        choseBirthDate: "Choose Birth Date",
        phoneNumber: "Phone Number",
        enterphoneNumber: "Enter phone number",
        register: "Register",
        password: "Password",
    },
    help: {
        title: "Help & Support",
        subtitle: "Find answers to common questions or contact our support team.",
        faq: "Frequently Asked Questions",
        contact: "Contact Support",
        learn_more: "Learn More",
        email_us: "Email Us",

        // FAQs
        reset_password: {
            q: "How do I reset my password?",
            a: "To reset your password, go to the login screen and click on 'Forgot Password'. Follow the instructions sent to your email.",
        },
        change_language: {
            q: "How can I change the app language?",
            a: "You can change the app language by going to Settings > Language and selecting your preferred language.",
        },
        contact_support: {
            q: "How do I contact customer support?",
            a: "You can contact our support team by emailing support@example.com.",
        },
    },

    theme: {
        title: "Theme",
        description: "Choose how the app looks on your device",
        system: "System default",
        light: "Light",
        dark: "Dark"
    },
    security: {
        title: "Security Settings",
        password: "Password",
        changePassword: "Change Password",
        authentication: "Authentication",
        twoFA: "Two-Factor Authentication",
        biometric: "Biometric Authentication",
        sessions: "Sessions",
        activeSessions: "Active Sessions",
        logoutAll: "Logout from all devices",
        logoutAllConfirm: "Are you sure you want to logout from all devices?",
        currentDevice: "Current Device",
        justNow: "Just now",
        lastActive: "Last active",
        logoutConfirm: "Are you sure you want to logout from this device?"
    },
    terms: {
        title: 'Terms of Service',
        content: `Welcome to our application.

By accessing or using this application, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue using the application.

1. User Account  
You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. The information you provide must be accurate, complete, and kept up to date.

2. User Responsibilities  
You agree not to use the application for any unlawful purposes or in any way that may harm, disrupt, or negatively affect the system, data, or other users. Any fraudulent or abusive behavior may result in account suspension or termination.

3. Intellectual Property  
All content within the application, including but not limited to text, images, logos, interface designs, and source code, is the property of the application owner or its licensors and is protected by applicable intellectual property laws.

4. Limitation of Liability  
We shall not be liable for any direct or indirect damages arising from the use of or inability to use the application, including but not limited to data loss, service interruptions, or system errors beyond our reasonable control.

5. Service Changes and Termination  
We reserve the right to modify, suspend, or terminate all or part of the services at any time without prior notice.

6. Governing Law  
These Terms of Service shall be governed by and construed in accordance with the laws of the Socialist Republic of Vietnam.

If you have any questions regarding these Terms of Service, please contact us through our official support channels.`
    },
    privacy: {
        title: 'Privacy Policy',
        content: `This Privacy Policy explains how we collect, use, and protect your personal information when you use our application.

1. Information We Collect  
We may collect the following types of information:
- Personal information: including your name, email address, phone number, and other information you provide when registering an account or using our services.
- Technical information: including IP address, browser type, operating system, and other data related to your use of the application.

2. How We Use Your Information  
We use the collected information to:
- Provide and maintain our services.
- Improve user experience.
- Send important notifications related to your account or services.
- Analyze and conduct research to enhance service quality.

3. Information Security  
We are committed to protecting your personal information by implementing appropriate technical and organizational security measures to prevent unauthorized access, disclosure, or loss of data.

4. Sharing Information with Third Parties  
We do not sell, rent, or share your personal information with third parties without your consent, except when required by law or to protect our legitimate rights and interests.

5. Your Rights  
You have the right to access, update, or delete your personal information. You may also opt out of receiving marketing communications from us at any time.

6. Changes to This Privacy Policy  
We may update this Privacy Policy from time to time. Any changes will be posted within the application and will take effect immediately upon publication.

7. Contact Us  
If you have any questions or concerns regarding this Privacy Policy, please contact us through our official support channels.`
    },
    about: {
        title: "About Us",
        version: "App Version",
        description: "This application is developed to provide users with the best experience in managing their tasks efficiently and effectively. Our mission is to deliver high-quality services that meet the needs of our users.",
        developer: "Developed by ABC Company",
        contact: "Contact Us at support@example.com",
        appName: "Task Manager App",
    },
    language: {
        title: "Language",
        selectLanguage: "Select language",
        english: "English",
        vietnamese: "Vietnamese",
    },
    password: {
        success: 'Your password has been updated',
        pleaseLogin: 'Please sign in again',
        error: 'Failed to change password. Please try again',
    },
    modal: {
        deleteAccountTitle: "⚠️ Confirm Account Deletion",
        deleteAccountMessage: "Are you sure you want to delete your account? This action cannot be undone.",
        cancel: "Cancel",
        delete: "Delete"
    },
    greeting: {
        morning: "Good morning",
        afternoon: "Good afternoon",
        evening: "Good evening"
    },
    project: {
        create: "Create Project",
        edit: "Edit Project",
        name: "Project Name",
        namePlaceholder: "Enter project name",
        type: "Project Type",
        typePlaceholder: "Select project type",
        cost: "Cost",
        costPlaceholder: "Enter project cost",
        slotPayment: "Slot Payment",
        slotPaymentPlaceholder: "Enter slot payment",
        dateStart: "Start Date",
        dateEnd: "End Date",
        costPlan: "Cost Plan",
        costRate: "Cost Rate (%)",
        profitPlan: "Profit Plan",
        profitRate: "Profit Rate (%)",

        marginRate: "Margin Rate (%)",
        feedbackRate: "Feedback Rate (%)",
        selectProjectType: "Select project type",
        status: "Status",
        statusOptions: {
            all: "All",
            draft: "Draft",
            active: "Active",
            completed: "Completed",
            unknown: "Unknown",
        },
        createSuccess: "Project created successfully",
        createFailed: "Failed to create project. Please try again.",

        nameError: "Please enter project name",
        dateStartError: "Please select start date",
        dateEndError: "Please select end date",
        costError: "Please enter project cost",
        slotPaymentError: "Please enter slot payment",
        typeError: "Please select project type",
        detail: 'Project Detail',

        generalInfo: "General Information",
        finance: "Financial Information",
        timeProgress: "Time Progress",
        costProgress: "Cost Progress",
        timeline: "Timeline",
        code: "Project Code",
        paymentSchedule: "Payment Schedule",
        overview: "Overview",
        noProject: 'No project',
        filter: 'Enter keyword...'
    },
    payment: {
        paid: "Paid",
        unpaid: "Unpaid",
        paymentDate: "Payment Date",
        amount: "Amount",
        note: "Note"
    }


};
