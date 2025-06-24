// Importa todos los componentes necesarios desde /Component/Application
import PresentationApp from './Application/PresentationApp';
import LinkedInApp from './Application/LinkedInApp';
import PortfolioApp from './Application/PortfolioApp';
import GoogleApp from './Application/GoogleApp';
import CVwebApp from './Application/CVwebApp';
import CmdApp from './Application/CmdApp';

// Crea un mapeo de los nombres de componentes a los componentes reales
const ApplicationsMap = {
  PresentationApp,
  LinkedInApp,
  PortfolioApp,
  GoogleApp,
  CVwebApp,
  CmdApp
};

export default ApplicationsMap;
