import DownIMG from '../../../assets/images/icon-down.svg';
import FaqDropdown from '../../yeniler/faqDropdown';
export default function WarrantyComp() {
    return(
        <div className="warranty wf-section">
            <div className="dv-wrapper">
                <div className="warranty-block">
                <h3 className="heading-9">Zəmanət</h3>
 
                 <FaqDropdown title={"Zəmanət"}>
                <p>-Məhsullara rəsmi olaraq 36 aya qədər zəmanət verilir.</p>
                </FaqDropdown>

                <FaqDropdown title={"Zəmanət verilməyən hallar"}>
                <p>İstismar, saxlama, daşınma, montaj qaydaları pozulduqda (sökülmüş halda çatdırıldıqda) istehsalçı tərəfindən zəmanət verilmir. <br />
Məhsulun alınma tarixinin qəbul edilməsi üçün zəmanət müddəti ərzində zəmanət kartı, təhvil-təslim aktı, çek, qaimə-faktura və bənzəri sənədlər təqdim edildiyi təqdirdə zəmanət verilən malla bağlı zəmanət qüvvədədir. Sənədlər natamam olduğu təqdirdə şirkətin zəmanət xidməti göstərməkdən imtina etmək hüququ vardır.
.</p>
                </FaqDropdown>
                 <FaqDropdown title={"Zəmanətin qüvvədə olmadığı hallar"}>
                <p>Mebelin alınma tarixinin qəbul edilməsi üçün zəmanət müddəti ərzində zəmanət kartı, təhvil-təslim aktı, çek, qaimə-faktura və bənzəri sənədlər təqdim edildiyi təqdirdə zəmanət verilən malla bağlı zəmanət qüvvədədir. Sənədlər natamam olduğu təqdirdə şirkətin zəmanət xidməti göstərməkdən imtina etmək hüququ vardır.</p>
                </FaqDropdown>
 
                <FaqDropdown title={"Zəmanət xidmətinə daxil olmayan hallar"}>
                <p>Şirkət tərəfindən quraşdırılmadığı təqdirdə yaranan qüsurlar.<br />Zəmanət müddətinin bitməsi; <br /> Göstərilən mebel qaydalarına riayət edilməməsi; <br />Mebelin üzərində təhvil-təslimdən sonra mexaniki zədələrin yaranması; <br />Mexanizmlərin normadan artıq yüklənməsi; <br />Mebelin təbii fəlakət (sel, yanğın, bədbəxt hadisə, v.s.) nəticəsində zərər görməsi; <br />İstehlakçı tərəfindən bilərək və ya bilməyərək mebelə fiziki zərər yetirilməsi; <br />Mebelə, təmir məqsədi ilə şirkət tərəfindən təyin edilməmiş ustaların müdaxilə etməsi nəticəsində zədələrin aşkarlanması; <br />Mebelə istehlakçı tərəfindən konstruktiv dəyişikliyin edilməsi nəticəsində zərərin verilməsi; <br />Təmizlik zamanı mebelə zərər verə biləcək maddələrdən istifadə olunması; <br />Mebelin yanlış istismarı nəticəsində qüsurların yaranması (cızılma, əzilmə, qırılma və.s.) <br />Yuxarıda qeyd olunmuş hallar meydana gəldiyi təqdirdə göstərilən xidmət ödənişlidir və şirkət tərəfindən təyin edilmiş qiymətlərlə həyata keçirilir. Qüsurun xüsusiyyəti mebelə baxış keçirilən zaman ekspert tərəfindən təyin edilir. <br />Qeyd: Mebel təhvil verildikdən sonra aşkarlanmış mexaniki zədələrə aid şikayətlər zəmanətli təmir üçün əsas kimi qəbul olunmur. &nbsp;Həmin problemlərin aradan qaldırılması ödəniş müqabilində həyata keçirilir. Mebelin görünməyən və xarici görünüşünə təsir etməyən hissələrində olan kiçik çaplı qüsurlar yol veriləndir. </p>
                </FaqDropdown>

                  </div>
            </div>
        </div>
    )
}