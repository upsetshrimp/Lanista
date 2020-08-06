import Gladiator from "../gladiator"
const AppStorage = {
    initializeConditions: () => {
        const martial = window.localStorage.getItem("martial")
        const showmanship = window.localStorage.getItem("showmanship")
        const name = window.localStorage.getItem("name")
        const attributes = window.localStorage.getItem("attributes")
        const wins = window.localStorage.getItem("wins")
        const losses = window.localStorage.getItem("losses")
        const brand = window.localStorage.getItem("brand")
        if (martial && showmanship && name && attributes && wins && losses && brand) {
            return {
                gladiator: new Gladiator(martial, showmanship, name, attributes),
                wins,
                losses,
                brand,
            }
        }
        return {
            gladiator: new Gladiator(),
            wins: 0,
            losses: 0,
            brand: 10,
        }

    },
    saveCondition: (propertyName, propertyValue) => {
        window.localStorage.setItem(propertyName, propertyValue)
    }

}

export default AppStorage