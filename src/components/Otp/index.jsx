import { Link } from "react-router-dom";
import React, {useEffect, Component} from 'react';
import axios from "axios";
export default class OTPComp extends Component {
    render() {
        const errStyle = {
            display: "block",
            color: 'blue',
        };
        const otpBody = {
            display: "none",
        };
        const otpStyle = {
            display: "none",
        };
        const newPasswordForm = {
            display: "none",
        };
        var phone_number = localStorage.getItem('PasswordResetNumber');
        function checkRealOtpState() {
             if(localStorage.getItem('PasswordResetNumber')) {
                errStyle.display = "none";
                otpBody.display = "block";
                otpStyle.display = "flex";
            }
            else {
                errStyle.display = "block";
            }
        }
        checkRealOtpState()
        function handleFocus(e) {
            if(e.target.nextSibling)
                e.target.nextSibling.focus();
        }
        function OtpApprove() {
            document.getElementById("otpStyle").style.display = "none";
            document.getElementById("newPasswordForm").style.display = "block";
            document.getElementById("newPassword").style.cssText = `margin-bottom: 8px;`;
        }
        function OtpWrong() {
            const boxes = document.querySelectorAll('.otp-main-block');
            for (const box of boxes) {
                box.classList.add('wrong_input');
            }
        }
        function submitOtp(e) {
            e.preventDefault();
            let completeNumber = document.querySelector('input[name="name-1"]').value+
                document.querySelector('input[name="name-2"]').value+
                document.querySelector('input[name="name-3"]').value+
                document.querySelector('input[name="name-4"]').value+
                document.querySelector('input[name="name-5"]').value+
                document.querySelector('input[name="name-6"]').value;
            axios({
                method: 'get',
                baseURL: `https://otpservice.digimall.az/api/Sms/VerifyOtp?phoneNumber=${phone_number}&otpValue=${completeNumber}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if(response.data.result === "Verified") {
                    OtpApprove();
                }
                else {
                    OtpWrong();
                }
            });
        }
        function submitNewPassword(e) {
            e.preventDefault();
            if(document.getElementById("newPassword").value === document.getElementById("newPasswordConfirm").value) {
                axios({
                    method: 'post',
                    baseURL: 'https://identity.digimall.az/api/Password/ResetPasswordByUser',
                    headers: {
                        'Content-Type' : 'application/json',
                        'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
                    },
                    data: {
                        userName: phone_number,
                        password: document.querySelector('input[name="newPassword"]').value,
                    }
                }).then(function (response) {
                    if(!response.data.hasError) {
                        document.getElementsByClassName('opt-head')[0].innerText = "Tebrikler";
                        document.getElementsByClassName('text-block-13')[0].innerText = "Yeni şifrəniz uğurla təyin olundu";
                        const boxes = document.querySelectorAll('.newPswd');
                        for (const box of boxes) {
                            box.classList.remove('wrong_input');
                        }
                        document.getElementById('newPasswordForm').style.display = 'none';
                        document.getElementsByClassName('login-button-otp')[0].style.cssText = `display: block;`;
                        localStorage.removeItem('PasswordResetNumber');
                    }
                    else {
                        alert("Xəta baş verdi");
                    }
                })
            }
            else {
                const boxes = document.querySelectorAll('.newPswd');
                for (const box of boxes) {
                    box.classList.add('wrong_input');
                }
            }
        }
        return(
            <div className="opt-verify wf-section">
            <div id="erorr-page-text" style={errStyle}>
                Xəta baş verdi
            </div>
            <div className="dv-wrapper">
                <div className="opt-w">
                    <div id="w-node-e5feec52-ba8b-d382-fd3c-2f24213f0398-51d2f875" className="otp-w-block" style={otpBody}>
                        <div className="otp-cont">
                            <h3 className="opt-head">OTP kodu təsdiq edin</h3>
                            <div className="text-block-13">Mobil nömrəyə göndərilən kodu aşağıya daxil edin</div>
                            <div className="form-block w-form">
                                <form onSubmit={submitNewPassword} style={newPasswordForm} id="newPasswordForm">
                                    <input type="password" name="newPassword" minLength={8} className="form-ps w-input newPswd" id="newPassword" placeholder="Yeni şifrəniz"/>
                                    <input type="password" name="newPasswordConfirm" minLength={8} className="form-ps w-input newPswd" id="newPasswordConfirm" placeholder="Yeni şifrə təkrar"/>
                                    <input type="submit" value="ŞİFRƏNİ YENİLƏYİN" id="forgot-passwd-button" className="forgot-passwd-button w-button" />
                                </form>
                                <form className="otp-form" onSubmit={submitOtp} style={otpStyle} id="otpStyle">
                                    <div className="_6x-otp">
                                        <input type="text" className="otp-main-block gap-r-4 w-input" onChange={handleFocus} maxLength={1} name="name-1" placeholder="*" required />
                                        <input type="text" className="otp-main-block gap-r-4 w-input" onChange={handleFocus} maxLength={1} name="name-2" placeholder="*" required />
                                        <input type="text" className="otp-main-block gap-r-4 w-input" onChange={handleFocus} maxLength={1} name="name-3" placeholder="*" required />
                                        <input type="text" className="otp-main-block gap-r-4 w-input" onChange={handleFocus} maxLength={1} name="name-4" placeholder="*" required />
                                        <input type="text" className="otp-main-block gap-r-4 w-input" onChange={handleFocus} maxLength={1} name="name-5" placeholder="*" required />
                                        <input type="text" className="otp-main-block w-input" onChange={submitOtp} maxLength={1}  name="name-6" placeholder="*" required />
                                        <input type="submit" value="ŞİFRƏNİ YENİLƏYİN" className="lowno" />
                                    </div>
                                </form>
                                <a href="/daxil-ol" className="login-button-otp w-button">Daxil ol</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}