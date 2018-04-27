/*
 * @Author: Maiduo
 * @Date: 2018-04-27 19:29:43
*/
const adminService = require('../services/admin');
module.exports = {
    /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn( ctx ) {
    let formData = ctx.request.body
    let result = {
      msg: '',
      data: {},
      code: 0
    }

    const userResult = await adminService.signIn( formData );
    if ( userResult ) {
      if ( formData.name === userResult.name ) {
        result.msg = 'SUCCESS';
        result.code = 200;
      } else {
        result.msg = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
      }
    } else {
      result.msg = 'FAIL_USER_NO_EXIST';
    }

    if ( formData.source === 'form' && result.code === 200 ) {
      let session = ctx.session
      session.isLogin = true
      session.userName = userResult.name
      session.userId = userResult.id
      ctx.redirect('/admin/home')
    } else {
      ctx.body = result
    }
  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async signUp( ctx ) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null
    }

    let validateResult = userInfoService.validatorSignUp( formData )

    if ( validateResult.success === false ) {
      result = validateResult
      ctx.body = result
      return
    }

    let existOne  = await userInfoService.getExistOne(formData)
    console.log( existOne )

    if ( existOne  ) {
      if ( existOne .name === formData.userName ) {
        result.message = userCode.FAIL_USER_NAME_IS_EXIST
        ctx.body = result
        return
      }
      if ( existOne .email === formData.email ) {
        result.message = userCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }


    let userResult = await userInfoService.create({
      email: formData.email,
      password: formData.password,
      name: formData.userName,
      create_time: new Date().getTime(),
      level: 1,
    })

    console.log( userResult )

    if ( userResult && userResult.insertId * 1 > 0) {
      result.success = true
    } else {
      result.message = userCode.ERROR_SYS
    }

    ctx.body = result
  },
}