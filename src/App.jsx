import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./Pages/HomePage";
import Urology from "./Components/Products/Urology";
import SurgicalLaser from "./Components/Products/SurgicalLaser";
import UrodynamicSystem from "./Components/Products/UrodynamicSystem";
import ESWLLithotripsy from "./Components/Products/ESWLLithotripsy";
import ENT from "./Components/Products/ENT";
import Blogs from "./Pages/Blogs";
import Newsletter from "./Pages/Newsletter";
import MachinePage from "./Pages/MachinePage";
import ContactPage from "./Pages/ContactPage";
import SmartXide from "./Pages/SmartXide";
import SmartXideTouch from "./Pages/SmartXideTouch";
import Gastro from "./Components/Products/Gastro";
import GastroLaser from "./Components/Products/GastroLaser";
import LithoEvo from "./Pages/LithoEvo";
import Litho35Watt from "./Pages/Litho35Watt";
import DK30Watt from "./Pages/DK30Watt";
import CyberHo100Watt from "./Pages/CyberHo100Watt";
import CyberHo150Watt from "./Pages/CyberHo150Watt";
import CyberTM150Watt from "./Pages/CyberTM150Watt";
import CyberTM200Watt from "./Pages/CyberTM200Watt";
import FiberDust60Watt from "./Pages/FiberDust60Watt";
import VikrantTFL from "./Pages/VikrantTFL";
import CyberHoMagnetoFamily from "./Pages/CyberHoMagnetoFamily";
import Avicenna from "./Pages/Avicenna";
import Multimed from "./Pages/Multimed";
import Vibrolith from "./Pages/Vibrolith";
import VibrolithPlus from "./Pages/VibrolithPlus";
import VibrolithOrtho from "./Pages/VibrolithOrtho";
import Cystoscopy from "./Pages/Cystoscopy";
import Morcescope from "./Pages/Morcescope";
import CyberBlade from "./Pages/CyberBlade";
import RaykeenMorcellator from "./Pages/RaykeenMorcellator";
import ProductEnquiry from "./Pages/ProductEnquiry";
import ENTLaser from "./Components/Products/ENTLaser";
import Elmed from "./Components/Products/Elmed";
import RZ from "./Components/Products/RZ";
import Morcellator from "./Components/Products/Morcellator";
import EndoUrology from "./Components/Products/EndoUrology";
import FlexibleVideoUreterorenoscope from "./Components/Products/FlexibleVideoUreterorenoscope";
import HolmiumLaser from "./Components/Products/HolmiumLaser";
import ThuliumLaser from "./Components/Products/ThuliumLaser";
import ThuliumFiberLaser from "./Components/Products/ThuliumFiberLaser";
import UrodynamicSystems from "./Components/Products/UrodynamicSystems";
import Uroflowmeters from "./Components/Products/Uroflowmeters";
import Melody from "./Pages/Melody";
import Symphony from "./Pages/Symphony";
import Harmony from "./Pages/Harmony";
import DanflowWave from "./Pages/DanflowWave";
import DanflowCord from "./Pages/DanflowCord";
import BladderScanner from "./Pages/BladderScanner";
import PatientCouch from "./Pages/PatientCouch";
import HUV02 from "./Pages/HUV02";
import HUV01 from "./Pages/HUV01";
import ReusableUreterorenoscope from "./Pages/ReusableUreterorenoscope";
import DisposableHU30M63Fr from "./Pages/DisposableHU30M63Fr";
import DisposableHU30M75Fr from "./Pages/DisposableHU30M75Fr";
import DisposableCystoscope from "./Pages/DisposableCystoscope";
import AccessSheath from "./Pages/AccessSheath";
import MedicalImageProcessor from "./Pages/MedicalImageProcessor";
import DisposableUreterorenoscope from "./Pages/DisposableUreterorenoscope";
import Cystonephroscope from "./Pages/Cystonephroscope";
import SuctionPump from "./Pages/SuctionPump";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes (with standard Layout / Navbar / Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/urology" element={<Urology />} />
          <Route path="/urology-surgical-laser" element={<SurgicalLaser />} />
          <Route path="/surgical-laser" element={<SurgicalLaser />} />
          <Route path="/surgical-lasers" element={<SurgicalLaser />} />
          <Route path="/holmium-yag-laser" element={<HolmiumLaser />} />
          <Route path="/holmium-laser" element={<HolmiumLaser />} />
          <Route path="/thulium-yag-laser" element={<ThuliumLaser />} />
          <Route path="/thulium-laser" element={<ThuliumLaser />} />
          <Route path="/thulium-fiber-laser" element={<ThuliumFiberLaser />} />
          <Route path="/thulium-fiber" element={<ThuliumFiberLaser />} />
          <Route path="/urology-urodynamic" element={<UrodynamicSystem />} />
          <Route path="/urodynamic-system" element={<UrodynamicSystem />} />
          <Route path="/urodynamics" element={<UrodynamicSystem />} />
          <Route path="/urodynamic-systems" element={<UrodynamicSystems />} />
          <Route path="/uroflowmeters" element={<Uroflowmeters />} />
          <Route path="/urology-eswl" element={<ESWLLithotripsy />} />
          <Route path="/eswl-lithotripsy" element={<ESWLLithotripsy />} />
          <Route path="/eswl" element={<ESWLLithotripsy />} />
          <Route path="/ent" element={<ENT />} />
          <Route path="/ent-laser" element={<ENTLaser />} />
          <Route path="/elmed" element={<Elmed />} />
          <Route path="/rz" element={<RZ />} />
          <Route path="/morcellator" element={<Morcellator />} />
          <Route path="/morcellator-system" element={<Morcellator />} />
          <Route path="/urology-morcellator" element={<Morcellator />} />
          <Route path="/urology-endo" element={<EndoUrology />} />
          <Route path="/endo-urology" element={<EndoUrology />} />
          <Route path="/flexible-video-ureterorenoscope" element={<FlexibleVideoUreterorenoscope />} />
          <Route path="/urology-ureterorenoscope" element={<FlexibleVideoUreterorenoscope />} />
          <Route path="/flexible-video-urs" element={<FlexibleVideoUreterorenoscope />} />

          <Route path="/gastro" element={<Gastro />} />
          <Route path="/gastro-laser" element={<GastroLaser />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/machine" element={<MachinePage />} />
          <Route path="/products" element={<MachinePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product-enquiry" element={<ProductEnquiry />} />
          <Route path="/product-enquiry/:machineId" element={<ProductEnquiry />} />
          <Route path="/product-enquiry/:machineId/:machineName" element={<ProductEnquiry />} />
          <Route path="/smartxide" element={<SmartXide />} />
          <Route path="/smartxide-touch" element={<SmartXideTouch />} />
          <Route path="/dk30watt" element={<DK30Watt />} />
          <Route path="/litho35watt" element={<Litho35Watt />} />
          <Route path="/cyberho100watt" element={<CyberHo100Watt />} />
          <Route path="/cyberho150watt" element={<CyberHo150Watt />} />
          <Route path="/cyber-tm-150" element={<CyberTM150Watt />} />
          <Route path="/cyber-tm-200" element={<CyberTM200Watt />} />
          <Route path="/fiber-dust-60" element={<FiberDust60Watt />} />
          <Route path="/vikrant-tfl" element={<VikrantTFL />} />
          <Route path="/cyber-ho-magneto-family" element={<CyberHoMagnetoFamily />} />
          <Route path="/lithoevo35watt" element={<LithoEvo />} />
          <Route path="/litho-evo" element={<LithoEvo />} />
          <Route path="/avicenna" element={<Avicenna />} />
          <Route path="/multimed" element={<Multimed />} />
          <Route path="/vibrolith" element={<Vibrolith />} />
          <Route path="/vibrolith-plus" element={<VibrolithPlus />} />
          <Route path="/vibrolith-ortho" element={<VibrolithOrtho />} />
          <Route path="/cystoscopy" element={<Cystoscopy />} />
          <Route path="/morcescope" element={<Morcescope />} />
          <Route path="/cyber-blade" element={<CyberBlade />} />
          <Route path="/bro-morcellatore-cyberblade" element={<CyberBlade />} />
          <Route path="/raykeen-morcellator" element={<RaykeenMorcellator />} />
          <Route path="/raykeen-morcellatore" element={<RaykeenMorcellator />} />
          <Route path="/melody" element={<Melody />} />
          <Route path="/symphony" element={<Symphony />} />
          <Route path="/harmony" element={<Harmony />} />
          <Route path="/danflow-wave" element={<DanflowWave />} />
          <Route path="/danflow-cord" element={<DanflowCord />} />
          <Route path="/bladder-scanner-details" element={<BladderScanner />} />
          <Route path="/bladder-scanner" element={<BladderScanner />} />
          <Route path="/mmt-bladder-scanner" element={<BladderScanner />} />
          <Route path="/patient-couch-details" element={<PatientCouch />} />
          <Route path="/patient-couch" element={<PatientCouch />} />
          <Route path="/patient-coach" element={<PatientCouch />} />
          <Route path="/trytable-patient-coach" element={<PatientCouch />} />
          <Route path="/huv02" element={<HUV02 />} />
          <Route path="/huv-02" element={<HUV02 />} />
          <Route path="/huv01" element={<HUV01 />} />
          <Route path="/huv-01" element={<HUV01 />} />
          <Route path="/reusable-ureterorenoscope" element={<ReusableUreterorenoscope />} />
          <Route path="/disposable-hu30m-6-3fr" element={<DisposableHU30M63Fr />} />
          <Route path="/disposable-hu30m-6.3-fr" element={<DisposableHU30M63Fr />} />
          <Route path="/hu30m-6-3fr" element={<DisposableHU30M63Fr />} />
          <Route path="/disposable-hu30m-7-5fr" element={<DisposableHU30M75Fr />} />
          <Route path="/disposable-hu30m-7.5-fr" element={<DisposableHU30M75Fr />} />
          <Route path="/disposable-hu30m-7.5fr" element={<DisposableHU30M75Fr />} />
          <Route path="/disposable-hu30m-7.5" element={<DisposableHU30M75Fr />} />
          <Route path="/disposable-hu30m-7-5" element={<DisposableHU30M75Fr />} />
          <Route path="/disposable-hu30m-75fr" element={<DisposableHU30M75Fr />} />
          <Route path="/disposable-hu30m-75" element={<DisposableHU30M75Fr />} />
          <Route path="/hu30m-7-5fr" element={<DisposableHU30M75Fr />} />
          <Route path="/hu30m-7.5-fr" element={<DisposableHU30M75Fr />} />
          <Route path="/hu30m-7.5" element={<DisposableHU30M75Fr />} />
          <Route path="/hu30m-7-5" element={<DisposableHU30M75Fr />} />
          <Route path="/hu30s-7-5fr" element={<DisposableHU30M75Fr />} />
          <Route path="/hu30s-7.5-fr" element={<DisposableHU30M75Fr />} />
          <Route path="/hu30s-7.5" element={<DisposableHU30M75Fr />} />
          <Route path="/hu30s" element={<DisposableHU30M75Fr />} />
          <Route path="/disposable-cystoscope" element={<DisposableCystoscope />} />
          <Route path="/cystoscope" element={<DisposableCystoscope />} />
          <Route path="/access-sheath" element={<AccessSheath />} />
          <Route path="/ureteral-access-sheath" element={<AccessSheath />} />
          <Route path="/medical-image-processor" element={<MedicalImageProcessor />} />
          <Route path="/disposable-ureterorenoscope" element={<DisposableUreterorenoscope />} />
          <Route path="/cystonephroscope" element={<Cystonephroscope />} />
          <Route path="/suction-pump" element={<SuctionPump />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
