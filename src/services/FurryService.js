
import settings from '../AppSettings'

export default class FurryService {
    getSetting() {
          return  fetch(settings.settingsUrl).then((result) => result.json())
    }

    getFurries() { 
        return  fetch(settings.furryUrl).then((result) => result.json()).then((result) => {
            //add the "saved" property to all furries
            return result.map((item) => {
                item.save = false;
                return item;
            })
        })
    }
}