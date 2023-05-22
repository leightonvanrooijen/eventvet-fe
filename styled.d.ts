import "styled-components";
import { Theme } from "./src/componentLibrary/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
