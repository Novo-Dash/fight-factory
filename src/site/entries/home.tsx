import { mountPage } from '../layout/mount'
import { HomePage } from '../pages/HomePage'
import { HOME_HREF } from '../content/site'

// The home page opens full-bleed on a photograph.
mountPage(HOME_HREF, <HomePage />, true)
