import page from "page";
import Home from "./routes/Home.js";
import OmniUnits from "./routes/OmniUnits.js";
import { loadOmniUnit, showOmniUnit } from "./routes/OmniUnit.js";
import Dbbs from "./routes/Dbbs.js";
import NotFound from "./routes/NotFound.js";

page('/', Home);
page('/omniunits', OmniUnits);
page('/omniunits/:omniunit', loadOmniUnit, showOmniUnit);
page('/dbbs', Dbbs);
page('*', NotFound);
// Call it!
page();