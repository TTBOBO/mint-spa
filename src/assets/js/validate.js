const validatePass = (rule, value, callback) => {
    if (value === '') {
         callback(new Error('请输入密码'));
    } else {
        if (this.pwdData.testPwd !== '') {
            // 对第二个密码框单独验证
             this.$refs.pwdData.validateField('testPwd');
        }
        callback();
    }
};
    const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.pwdData.newPwd) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    };