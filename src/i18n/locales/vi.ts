import { current } from "@reduxjs/toolkit";
import { all } from "axios";

export default {
    welcome_back: "Chào mừng bạn quay trở lại",
    common: {
        confirm: "Xác nhận",
        cancel: "Hủy",
        done: "Xong",
        loading: "Đang tải...",
        empty: "Không có dữ liệu",
        logout: "Đăng xuất",
        save: "Lưu",
        edit: "Chỉnh sửa",
        reset: "Đặt lại",
        apply: "Áp dụng",
        keyword: "Từ khóa",
        enterKeyword: "Nhập từ khóa...",
        back: "Quay lại",
        delete: 'Xóa',
        createSuccess: "Tạo mới thành công",
        updateSuccess: "Cập nhật thành công",
        deleteSuccess: "Xóa thành công",
        confirmDeleteTitle: "Xác nhận xoá",
        confirmDeleteMessage: "Bạn có chắc chắn muốn xoá mục này không?",
        action: "Hành động",
    },

    notification: {
        title: "Thông báo",
        empty: "Chưa có thông báo nào",
        loginSuccess: "Đăng nhập thành công",
        welcomeBack: "Chào mừng anh quay trở lại hệ thống",
        systemUpdate: "Cập nhật hệ thống",
        maintenance: "Hệ thống sẽ bảo trì lúc {{time}}",
        read: "Đánh dấu là đã đọc",
        delete: "Xóa"
    },

    datePicker: {
        selectDate: "Chọn ngày",
        mode: {
            date: "Ngày",
            time: "Giờ",
            month: "Tháng",
            year: "Năm",
        },
    },
    tab: {
        home: "Trang chủ",
        search: "Tìm kiếm",
        notification: "Thông báo",
        menu: "Menu",
        profile: "Hồ sơ cá nhân",
        settings: "Cài đặt",
        help: "Trợ giúp & hỗ trợ",
        security: "Bảo mật",
        language: "Ngôn ngữ",
        theme: "Giao diện",
        feedback: "Phản hồi",
        terms: "Điều khoản dịch vụ",
        privacy: "Chính sách bảo mật",
        about: "Về chúng tôi",
        deleteAccount: "Xóa tài khoản",
        privacyPolicy: "Chính sách bảo mật",

    },
    settings: {
        account: "Tài khoản",
        changePassword: "Đổi mật khẩu",
        security: "Bảo mật",
        system: "Hệ thống",
        language: "Ngôn ngữ",
        currentPasswordPlaceholder: "Nhập mật khẩu cũ",
        newPasswordPlaceholder: "Nhập mật khẩu mới",
        currentPassword: "Mật khẩu cũ",
        newPassword: "Mật khẩu mới",
        passwordRequirements: "Yêu cầu mật khẩu:",
        minimumLength: "Ít nhất 6 ký tự",
        hasNumber: "Ít nhất 1 chữ số",
        hasSpecialChar: "Ít nhất 1 ký tự đặc biệt",
        hasLetter: "Ít nhất 1 chữ cái",
    },
    profile: {
        name: "Họ và tên",
        email: "Email",
        updateProfileSuccess: "Cập nhật thông tin thành công"


    },
    login: {
        email: "Email",
        password: "Mật khẩu",
        rememberMe: "Ghi nhớ đăng nhập",
        forgotPassword: "Quên mật khẩu ?",
        login: "Đăng nhập",
        dontHaveAccount: "Chưa có tài khoản? ",
        signUp: "Đăng ký",
        getStarted: "Bắt đầu ngay",
        createAccountOrLogin: "Tạo tài khoản hoặc đăng nhập để khám phá ứng dụng của chúng tôi",
        signInWithGoogle: "Đăng nhập với Google",
        signInWithFacebook: "Đăng nhập với Facebook",
        or: "HOẶC",
        pleaseEnterAllInfo: "Vui lòng nhập đầy đủ thông tin",
        loginFailed: "Đăng nhập thất bại",
    },
    signup: {
        firstName: "Họ",
        lastName: "Tên đệm và tên",
        email: "Email",
        password: "Mật khẩu",
        firstNamePlaceholder: "Nhập họ của bạn",
        lastNamePlaceholder: "Nhập tên đệm và tên của bạn",
        passwordPlaceholder: "Nhập mật khẩu",
        emailPlaceholder: "Nhập email của bạn",
        confirmPassword: "Xác nhận mật khẩu",
        confirmPasswordPlaceholder: "Nhập lại mật khẩu của bạn",
        alreadyHaveAccount: "Đã có tài khoản? ",
        login: "Đăng nhập",
        birthDate: "Ngày sinh",
        choseBirthDate: "Chọn ngày sinh",
        phoneNumber: "Số điện thoại",
        register: "Đăng ký",
        createAccount: "Tạo tài khoản",
        enterphoneNumber: "Nhập số điện thoại",
    },
    help: {
        title: "Trợ giúp & hỗ trợ",
        subtitle: "Tìm câu trả lời cho các câu hỏi thường gặp hoặc liên hệ với nhóm hỗ trợ của chúng tôi.",
        faq: "Câu hỏi thường gặp",
        contact: "Liên hệ hỗ trợ",
        learn_more: "Tìm hiểu thêm",
        email_us: "Gửi email cho chúng tôi",

        // FAQs
        reset_password: {
            q: "Tôi phải làm sao để đặt lại mật khẩu?",
            a: "Để đặt lại mật khẩu, hãy vào màn hình đăng nhập và nhấn vào 'Quên mật khẩu'. Làm theo hướng dẫn được gửi đến email của bạn.",
        },
        change_language: {
            q: "Làm sao để đổi ngôn ngữ?",
            a: "Bạn có thể thay đổi ngôn ngữ ứng dụng bằng cách vào Cài đặt > Ngôn ngữ và chọn ngôn ngữ ưa thích của bạn.",
        },
        contact_support: {
            q: "Tôi phải làm sao để liên hệ với nhóm hỗ trợ?",
            a: "Bạn có thể liên hệ với nhóm hỗ trợ của chúng tôi bằng cách gửi email tới support@example.com.",
        },
    },
    theme: {
        title: "Giao diện",
        description: "Chọn cách hiển thị ứng dụng trên thiết bị của bạn",
        system: "Mặc định hệ thống",
        light: "Sáng",
        dark: "Tối"
    },
    security: {
        title: "Bảo mật",
        password: "Mật khẩu",
        changePassword: "Đổi mật khẩu",
        authentication: "Xác thực",
        twoFA: "Xác thực hai yếu tố (2FA)",
        biometric: "Sinh trắc học",
        sessions: "Phiên đăng nhập",
        activeSessions: "Phiên đăng nhập đang hoạt động",
        logoutAll: "Đăng xuất khỏi tất cả thiết bị",
        logoutAllConfirm: "Bạn có chắc chắn muốn đăng xuất khỏi tất cả thiết bị không?",
        currentDevice: "Thiết bị hiện tại",
        justNow: "Đang hoạt động",
        lastActive: "Lần hoạt động cuối",
        logoutConfirm: "Bạn có chắc muốn đăng xuất khỏi thiết bị này?"

    },
    terms: {
        title: 'Điều khoản sử dụng',
        content: `Chào mừng bạn đến với ứng dụng của chúng tôi.

Khi truy cập hoặc sử dụng ứng dụng, bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản sử dụng này. Nếu bạn không đồng ý với bất kỳ nội dung nào, vui lòng ngừng sử dụng ứng dụng.

1. Tài khoản người dùng  
Bạn có trách nhiệm bảo mật thông tin tài khoản của mình và chịu hoàn toàn trách nhiệm đối với mọi hoạt động diễn ra dưới tài khoản đó. Thông tin cung cấp phải chính xác, đầy đủ và được cập nhật khi cần thiết.

2. Quyền và nghĩa vụ  
Người dùng cam kết không sử dụng ứng dụng cho các mục đích trái pháp luật, không gây ảnh hưởng đến hệ thống, dữ liệu hoặc trải nghiệm của người dùng khác. Mọi hành vi gian lận, phá hoại hoặc vi phạm pháp luật đều có thể dẫn đến việc khóa hoặc chấm dứt tài khoản.

3. Quyền sở hữu trí tuệ  
Toàn bộ nội dung trong ứng dụng, bao gồm nhưng không giới hạn ở giao diện, hình ảnh, logo, văn bản và mã nguồn, đều thuộc quyền sở hữu của chúng tôi hoặc các bên liên quan và được bảo vệ theo quy định của pháp luật.

4. Giới hạn trách nhiệm  
Chúng tôi không chịu trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng ứng dụng, bao gồm nhưng không giới hạn ở mất dữ liệu, gián đoạn dịch vụ hoặc lỗi hệ thống ngoài tầm kiểm soát.

5. Thay đổi và chấm dứt dịch vụ  
Chúng tôi có quyền thay đổi, tạm ngừng hoặc chấm dứt một phần hoặc toàn bộ dịch vụ vào bất kỳ thời điểm nào mà không cần thông báo trước.

6. Luật áp dụng  
Các điều khoản này được điều chỉnh và giải thích theo pháp luật của Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.

Nếu bạn có bất kỳ câu hỏi nào liên quan đến Điều khoản sử dụng, vui lòng liên hệ với chúng tôi qua các kênh hỗ trợ chính thức.`
    },
    privacy: {
        title: 'Chính sách bảo mật',
        content: `Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng ứng dụng của chúng tôi.

1. Thông tin chúng tôi thu thập  
Chúng tôi có thể thu thập các loại thông tin sau:
- Thông tin cá nhân: bao gồm tên, địa chỉ email, số điện thoại và các thông tin khác mà bạn cung cấp khi đăng ký tài khoản hoặc sử dụng dịch vụ.
- Thông tin kỹ thuật: bao gồm địa chỉ IP, loại trình duyệt, hệ điều hành và các dữ liệu liên quan đến việc sử dụng ứng dụng.

2. Cách chúng tôi sử dụng thông tin  
Chúng tôi sử dụng thông tin thu thập được để:
- Cung cấp và duy trì dịch vụ.
- Cải thiện trải nghiệm người dùng.
- Gửi thông báo quan trọng liên quan đến tài khoản hoặc dịch vụ.
- Phân tích và nghiên cứu để nâng cao chất lượng dịch vụ.

3. Bảo mật thông tin  
Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn bằng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp nhằm ngăn chặn truy cập trái phép, tiết lộ hoặc mất mát dữ liệu.

4. Chia sẻ thông tin với bên thứ ba  
Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba mà không có sự đồng ý của bạn, trừ khi được yêu cầu bởi pháp luật hoặc để bảo vệ quyền lợi hợp pháp của chúng tôi.

5. Quyền của bạn
Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình. Bạn cũng có thể từ chối nhận các thông báo tiếp thị từ chúng tôi bất cứ lúc nào.

6. Thay đổi chính sách bảo mật  
Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được đăng tải trên ứng dụng và có hiệu lực ngay khi được công bố.

7. Liên hệ  
Nếu bạn có bất kỳ câu hỏi hoặc quan ngại nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua các kênh hỗ trợ chính thức.`

    },
    about: {
        title: "Về chúng tôi",
        version: "Phiên bản ứng dụng",
        description: "Ứng dụng này được phát triển nhằm mang đến cho người dùng trải nghiệm tốt nhất trong việc quản lý công việc một cách hiệu quả và hiệu suất. Sứ mệnh của chúng tôi là cung cấp các dịch vụ chất lượng cao đáp ứng nhu cầu của người dùng.",
        developer: "Được phát triển bởi Công ty ABC",
        contact: "Liên hệ với chúng tôi tại support@example.com",
        appName: "Ứng dụng Quản lý Công việc",

    },
    language: {
        title: "Ngôn ngữ",
        selectLanguage: "Chọn ngôn ngữ",
        english: "Tiếng Anh",
        vietnamese: "Tiếng Việt",
    },
    password: {
        success: 'Mật khẩu đã được cập nhật',
        pleaseLogin: 'Vui lòng đăng nhập lại',
        error: 'Đổi mật khẩu thất bại. Vui lòng thử lại',
    },
    modal: {
        deleteAccountTitle: "⚠️ Xác nhận xóa tài khoản",
        deleteAccountMessage: "Bạn có chắc chắn muốn xóa tài khoản không? Hành động này không thể hoàn tác.",
        cancel: "Hủy",
        delete: "Xóa"
    },
    greeting: {
        morning: "Chào buổi sáng",
        afternoon: "Chào buổi chiều",
        evening: "Chào buổi tối"
    },
    project: {
        create: "Tạo dự án mới",
        edit: "Cập nhật dự án",
        name: "Tên dự án",
        namePlaceholder: "Nhập tên dự án",
        type: "Loại dự án",
        cost: "Chi phí",
        costPlaceholder: "Nhập chi phí dự kiến",
        slotPayment: "Đợt thanh toán",
        slotPaymentPlaceholder: "Nhập số đợt thanh toán",
        typePlaceholder: "Chọn loại dự án",
        dateStart: "Ngày bắt đầu",
        dateEnd: "Ngày kết thúc",
        costPlan: "Chi phí dự kiến",
        costRate: "Tỷ lệ chi phí (%)",
        profitPlan: "Kế hoạch lợi nhuận",
        profitRate: "Tỷ lệ lợi nhuận (%)",

        marginRate: "Tỷ lệ biên lợi nhuận (%)",
        feedbackRate: "Tỷ lệ phản hồi (%)",
        selectProjectType: "Chọn loại dự án",
        status: "Trạng thái",
        statusOptions: {
            all: "Tất cả",
            draft: "Chưa bắt đầu",
            active: "Đang tiến hành",
            completed: "Đã hoàn thành",
            unknown: "Không xác định"

        },
        createSuccess: "Dự án đã được tạo thành công",
        createFailed: "Tạo dự án thất bại. Vui lòng thử lại",
        nameError: "Vui lòng nhập tên dự án",
        dateStartError: "Vui lòng chọn ngày bắt đầu",
        dateEndError: "Vui lòng chọn ngày kết thúc",
        costError: "Vui lòng nhập chi phí dự kiến",
        slotPaymentError: "Vui lòng nhập số đợt thanh toán",
        typeError: "Vui lòng chọn loại dự án",
        detail: "Chi tiết dự án",

        generalInfo: "Thông tin chung",
        finance: "Tài chính",
        timeProcess: "Tiến độ thời gian",
        costProcess: "Tiến độ chi phí",
        timeline: "Lịch trình",
        code: "Mã dự án",
        paymentSchedule: "Lịch thanh toán",
        overview: "Tổng quan",
        noProject: "Không có dự án",
        fiter: 'Nhập từ khóa...'
    }


};
