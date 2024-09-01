// Importa todos los componentes necesarios desde /Component/Application
import PresentationApp from './Application/PresentationApp';
import LinkedInApp from './Application/LinkedInApp';
import PortfolioApp from './Application/PortfolioApp';

// Crea un mapeo de los nombres de componentes a los componentes reales
const ApplicationsMap = {
  PresentationApp,
  LinkedInApp,
  PortfolioApp
};

export default ApplicationsMap;
