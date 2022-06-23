import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { publicLinks } from "../../App";
import axios from 'axios';
import InputMask from 'react-input-mask';
export default function Register() 
{
    const navigate = useNavigate();
    const [checkBoxState, setCheckBoxState] = useState(false)
    const checkBoxClass=checkBoxState?"w-checkbox-input w-checkbox-input--inputType-custom login-chckbox-btn w--redirected-checked":"w-checkbox-input w-checkbox-input--inputType-custom login-chckbox-btn";
    
    const [preloader, setPreloader] = useState(false);
    const [otpMode, setotpMode] = useState(false);

    /* REGISTER FORM CREDENTIALS */
    const [NameText, setNameText] = useState('');
    const [SurNameText, setSurNameText] = useState('');
    const [MobileText, setMobileText] = useState('');
    const inputPnumber = useRef();
    const [PasswordFirst, setPasswordFirst] = useState('');
    const [PasswordSecond, setPasswordSecond] = useState('');
    /* REGISTER FORM CREDENTIALS */

    /* API CALLBACK RESULT */
    const [NewUserId, setNewUserId] = useState(false);
    /* API CALLBACK RESULT */

    function submitOtp(event) {
     }
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }

    function registerHandle(e) {
        e.preventDefault();
        const boxes = document.querySelectorAll('.regPasInit');
        var cleanNumber = inputPnumber.current.value.replace(/[^\w\s]/gi, '').replace(/_/g, '');
        setMobileText(cleanNumber)
        if((PasswordFirst === PasswordSecond) && (PasswordFirst.length>7)) {
            setPreloader(true)
            axios({
                method: 'post',
                baseURL: 'https://identity.digimall.az/api/Users/AddCustomerUserWithOTP',
                headers: {
                    'Content-Type' : 'application/json',
                    'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
                },
                data: {
                    userName: cleanNumber,
                    mobile: cleanNumber,
                    email: "user+" + makeid(6) + "@cehizim.az",
                    password: PasswordSecond,
                    code: cleanNumber,
                }
            })
            .then(function (response) {
                for (const box of boxes) {
                    box.classList.remove('wrong_input'); 
                }
                if(response.data.hasError) {
                    alert(response.data.message);
                    setPreloader(false);
                }
                else {
                    var user_new_id = response.data.data.userId;
                    setNewUserId(user_new_id);
                 }
            })
        }
        else {
            for (const box of boxes) {
                box.classList.add('wrong_input');
            }
        }
    };
    useEffect(() => {
        if(NewUserId !== false) {
            var cleanNumber = inputPnumber.current.value.replace(/[^\w\s]/gi, '').replace(/_/g, '');
             axios({
                method: 'post',
                baseURL: 'https://apis.digimall.az/api/Customers/CreateNewCustomer',
                headers: {
                    'Content-Type' : 'application/json',
                    'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
                },
                data: {
                    code: cleanNumber,
                    name: NameText,
                    family: SurNameText,
                    cellPhone: cleanNumber, //not mobiletext we need to use mobilenumber
                    userId: NewUserId,
                }
            })
            .then(function (response) {
                setPreloader(false);
            })
            .finally(function(response) {
                setotpMode(true); //array sehfleri var muzakire olunmalidir mutleq sekilde
            })
        }
    }, [NewUserId]);
    function handleFocus(e) {
        if(e.target.nextSibling)
            e.target.nextSibling.focus();
    }
    function OtpApprove() {
        alert("Approved");
    }
    function OtpWrong() {
        const boxes = document.querySelectorAll('.otp-main-block');
        for (const box of boxes) {
            box.classList.add('wrong_input');
        }
    }
    function submitOtp(e) {
        e.preventDefault();
        var completeNumber = document.querySelector('input[name="name-1"]').value+
            document.querySelector('input[name="name-2"]').value+
            document.querySelector('input[name="name-3"]').value+
            document.querySelector('input[name="name-4"]').value+
            document.querySelector('input[name="name-5"]').value;
        axios({
            method: 'post',
            baseURL: `https://identity.digimall.az/api/Users/UserVerification`,
            headers: {
                'Content-Type': 'application/json',
                'accept' : 'text/plain',
                'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
            },
            data: {
                userName: MobileText,
                verificationCode: completeNumber,
            }
        }).then(function (response) {
             if(response.data.message === "OK") {
                OtpApprove();
                navigate("/daxil-ol");
            }
            else {
                OtpWrong();
            }
        });
    }
    return(
        <div className="register-sec wf-section">
            { preloader ?
                <div id="preloader" className="sc-AykKC ceHfpt">
                    <div className="sc-AykKH gNkidG"><span></span></div><div className="preloader-text">Yüklənir...</div>
                </div>
                :
                <></>
            }
            <div className={otpMode ? "disable-element-cs" : "dv-wrapper"}>
                <div className="register-w">
                    <div className="w-layout-grid register-grid">
                        <div id="w-node-_6bc96a31-dd70-59cb-c7d8-f4aed82ea974-280f1e9c" className="register-block">
                            <div className="login-cont">
                                <h3 className="login-heading">Qeydiyyat</h3>

                                <div className="login-form w-form">
                                    <form className="login-form-cont" onSubmit={registerHandle}>
                                        <input type="text" className="reg-name w-input" maxLength={256} name="name" placeholder="Ad" required onChange={(e) => { setNameText(e.target.value); } } />
                                        <input type="text" className="reg-surname w-input" maxLength={256} name="surname" placeholder="Soyad" required onChange={(e) => { setSurNameText(e.target.value); } } />
                                        <InputMask className="reg-phone w-input" placeholder="Telefon nömrəsi" mask="+\9\94-99-999-99-99" ref={inputPnumber} required />
                                        <input type="password" min={8} className="reg-pass w-input regPasInit" maxLength={256} name="password" placeholder="Şifrə" required onChange={(e) => { setPasswordFirst(e.target.value); } } />
                                        <input type="password" min={8} className="reg-conf-pass w-input regPasInit" maxLength={256} name="confirmPassword" placeholder="Şifrəni təkrarla" required onChange={(e) => { setPasswordSecond(e.target.value); } } />
                                        <a className="istShertleri istShertleri__login" href="/sertler" target="_blank">İstifadəçi şərtləri</a>
                                        <div className="div-block-6">
                                            <label className="w-checkbox login-checkbox">
                                                <div className={checkBoxClass} />
                                                <input onChange={(e)=>setCheckBoxState(e.target.checked)} type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" style={{opacity: 0, position: 'absolute', zIndex: -1}} />
                                                <span className="text-sm w-form-label" htmlFor="checkbox">Şərtləri qəbul edirəm</span>
                                            </label>
                                        </div>
                                        <input type="submit" value="Qeydiyyatdan keçin" className="reg-button w-button" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div id="w-node-_6bc96a31-dd70-59cb-c7d8-f4aed82ea98a-280f1e9c" className="login-divider" />
                        <div id="w-node-_6bc96a31-dd70-59cb-c7d8-f4aed82ea98b-280f1e9c" className="login-block">
                            <div className="log-content">
                                <h3 className="reg-heading">Daxil ol</h3>
                                <div className="text-sm">
                                    Mükafat qazanmaq və sifarişi izləmək üçün <br />
                                    daxil olun.
                                </div>
                                <Link to={publicLinks.login} className="reg-btn w-button">GİRİŞ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={otpMode ? "dv-wrapper" : "disable-element-cs" }>
                <div className="opt-w">
                    <div id="w-node-e5feec52-ba8b-d382-fd3c-2f24213f0398-51d2f875" className="otp-w-block">
                        <div className="otp-cont">
                            <h3 className="opt-head">Təsdiq kodunu daxil edin</h3>
                            <div className="text-block-13">Mobil nömrəyə göndərilən kodu aşağıya daxil edin</div>
                            <div className="form-block w-form">
                                <form className="otp-form" onSubmit={submitOtp}>
                                    <div className="_6x-otp">
                                        <input type="text" className="otp-main-block gap-r-4 w-input" onChange={handleFocus} maxLength={1} name="name-1" placeholder="*" required />
                                        <input type="text" className="otp-main-block gap-r-4 w-input" onChange={handleFocus} maxLength={1} name="name-2" placeholder="*" required />
                                        <input type="text" className="otp-main-block gap-r-4 w-input" onChange={handleFocus} maxLength={1} name="name-3" placeholder="*" required />
                                        <input type="text" className="otp-main-block gap-r-4 w-input" onChange={handleFocus} maxLength={1} name="name-4" placeholder="*" required />
                                        <input type="text" className="otp-main-block w-input" onChange={submitOtp} maxLength={1}  name="name-5" placeholder="*" required />
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
    );
}