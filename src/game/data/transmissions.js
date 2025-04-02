export const transmissions = {
    // Day 1 transmissions
    "88.5": [
        {
            id: "day1_1",
            sender: "Explorer Team Alpha",
            message: "Requesting supply drop at coordinates 7.5°S, 63.2°W. Over.",
            choices: [
                {
                    text: "Acknowledge and relay to HQ",
                    consequences: {
                        explorers: { trust: 10 },
                        resources: { batteries: -1 }
                    }
                },
                {
                    text: "Ignore transmission",
                    consequences: {
                        explorers: { trust: -10 }
                    }
                }
            ]
        }
    ],
    "92.3": [
        {
            id: "day1_2",
            sender: "Military Patrol",
            message: "Suspicious activity reported near indigenous settlement. Requesting radio silence. Over.",
            choices: [
                {
                    text: "Comply with request",
                    consequences: {
                        military: { trust: 10 },
                        tribes: { trust: -5 }
                    }
                },
                {
                    text: "Alert local tribes",
                    consequences: {
                        military: { trust: -10 },
                        tribes: { trust: 10 }
                    }
                }
            ]
        }
    ],
    "95.7": [
        {
            id: "day1_3",
            sender: "Unknown",
            message: "The ancient ones speak through the static...",
            choices: [
                {
                    text: "Log the transmission",
                    consequences: {
                        legends: { trust: 5 },
                        discoveredClues: ["mysterious_transmission"]
                    }
                },
                {
                    text: "Suppress the transmission",
                    consequences: {
                        legends: { trust: -5 }
                    }
                }
            ]
        }
    ]
};

export const gameEvents = {
    daily: [
        {
            id: "daily_supply_check",
            message: "Daily supply check: Food -1, Batteries -1",
            consequences: {
                resources: {
                    food: -1,
                    batteries: -1
                }
            }
        }
    ],
    random: [
        {
            id: "random_weather",
            message: "Heavy rain affecting radio signals. All transmissions will be unclear.",
            duration: 1,
            effects: {
                transmissionClarity: 0.5
            }
        }
    ]
}; 