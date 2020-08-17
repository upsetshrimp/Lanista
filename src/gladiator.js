export default class Gladiator {
    martialXP = 0
    showmanshipXP = 0
    constructor(martial = 1, showmanship = 1, name = "Maximus Decimus Meridius", attributes = "") {
        this.martial = martial
        this.showmanship = showmanship
        this.name = name
        this.attributes = attributes
    }
    static xpPerLevel = [100, 200, 200, 400]
    static resolveTraining = (chosenAction, gladiator) => {

        if (chosenAction === "martial") {
            let martialXP = gladiator.martialXP + 100
            let martialLevel = gladiator.martial
            if (this.xpPerLevel[gladiator.martial - 1] === martialXP) {
                martialXP = 0
                martialLevel++
            }
            return { martial: martialLevel, martialXP: martialXP }
        }
        if (chosenAction === "showmanship") {
            let showmanshipXP = gladiator.showmanshipXP + 100
            let showmanshipLevel = gladiator.showmanship
            if (this.xpPerLevel[gladiator.showmanship - 1] === showmanshipXP) {
                showmanshipXP = 0
                showmanshipLevel++
            }
            return { showmanship: showmanshipLevel, showmanshipXP: showmanshipXP }
        }
    }
}