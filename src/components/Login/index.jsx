import React, {useEffect, useState, useRef} from  "react";
import { useNavigate } from "react-router-dom";
import { publicLinks } from "../../App";
import { Link } from "react-router-dom";
import InputMask from 'react-input-mask';
const axios = require('axios');

export default function LoginComp() {
    const inputPnumber = useRef()
    const PasswordInput = useRef()
    const [checkBoxState, setCheckBoxState] = useState(false)
    const checkBoxClass=checkBoxState?"w-checkbox-input w-checkbox-input--inputType-custom login-chckbox-btn w--redirected-checked":"w-checkbox-input w-checkbox-input--inputType-custom login-chckbox-btn";
    var preLoaderStyle = {
        display: "flex"
    };
    const [preloader, setPreloader] = useState(false);
    const navigate = useNavigate();
    function submitLoginForm(e) {
        e.preventDefault();
        var cleanNumber = inputPnumber.current.value.replace(/[^\w\s]/gi, '').replace(/_/g, '');
        if(cleanNumber.length === 12) {
            setPreloader(true);
            axios({
                method: 'post',
                baseURL: 'https://identity.digimall.az/api/loginWithVerify',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
                },
                data: {
                    userName: cleanNumber,
                    password: PasswordInput.current.value
                }
            })
            .then(function (response) {
                setPreloader(false)
                if(!response.data.hasError){
                    localStorage.setItem('token', response.data.data.token);
                    navigate("/profil");
                }
                else {
                    alert("Məlumatlar yanlışdır");
                    document.getElementById("LoginFormCehizim").reset();
                }
            })
            .catch(function (error) {
            });
        }
    }
    useEffect(() => {
        var local_token = localStorage.getItem('token');
        if(local_token !== null) {
            navigate("/profil");
        }
    }, []);
    
    return(
        <>
        <div className="login-reg-sec wf-section">
        { preloader ?
            <div id="preloader" style={preLoaderStyle} className="sc-AykKC ceHfpt">
                <div className="sc-AykKH gNkidG"><span></span></div><div className="preloader-text">Yüklənir...</div>
            </div>
            :
            <></>
        }
            <div className="dv-wrapper">
                <div className="login-wrapper">
                    <div className="w-layout-grid login-reg-grid">
                        <div id="w-node-_3618a46a-152e-813d-cb71-26d481db7132-f060f113" className="login">
                            <div className="login-cont">
                                <h3 className="login-heading">Mövcud hesaba daxil olun.</h3>
                                <div className="login-form w-form">
                                    <form className="login-form-cont accessToLogin" onSubmit={submitLoginForm} id="LoginFormCehizim">
                                        <InputMask className="form-log-inp w-input" placeholder="Telefon nömrəsi" mask="+\9\94-99-999-99-99" ref={inputPnumber} required />
                                        <input ref={PasswordInput} type="password" className="form-ps w-input" maxLength={50} name="password" placeholder="Şifrə" required />
                                        <div className="div-block-6">
                                            <label className="w-checkbox login-checkbox">
                                                <div className={checkBoxClass} />
                                                <input onChange={(e)=>setCheckBoxState(e.target.checked)} type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" style={{opacity: 0, position: 'absolute', zIndex: -1}} />
                                                <span className="text-sm w-form-label" htmlFor="checkbox">Şifrəmi xatırla</span>
                                            </label>
                                        </div>
                                        <input type="submit" value="Giriş" data-wait="Please wait..." className="login-button w-button" />
                                        <Link to={publicLinks.forgotPassword} className="forgot-passwd">Şifrənizi unutmusunuz?</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div id="w-node-_4c070b29-a5c1-82f9-a6dc-b582aefde738-f060f113" className="login-divider" />
                        <div id="w-node-df007092-57b6-acb1-93ab-83caf7c75f52-f060f113" className="reg">
                            <div className="reg-div">
                                <h3 className="reg-heading">Hesab Yarat</h3>
                                <div className="text-sm">Yeniliklərdən xəbərdar olmaq və sifarişi izləmək üçün qeydiyyatdan keçin.</div>
                                <Link to={publicLinks.register} className="reg-btn w-button">Qeydİyyatdan keçİn</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}