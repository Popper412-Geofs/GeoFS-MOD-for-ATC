// ==UserScript==
// @name         GeoFS ATC Panel
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Adds a more realistic ATC panel overlay to GeoFS with real airport taxi instructions
// @author       Popper412
// @match        https://www.geo-fs.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Placeholder functions to prevent errors
    function initATC() {}
    function manageAirTraffic() {}
    function displayInfo() {}
    function interactWithGeoFS() {}

    // Realistic airport data with full taxi instructions
    const airportData = {
        KLAX: {
            departure: {
                gate: "Gate 60",
                taxiRoute: "via Bravo, Charlie, and Delta",
                runway: "25R"
            },
            arrival: {
                runway: "25R",
                exitTaxiway: "Echo",
                taxiRoute: "via Echo and Bravo to Gate 60"
            }
        },
        EGLL: { // London Heathrow (LHR)
            departure: {
                gate: "Gate 501",
                taxiRoute: "via Alpha and Bravo",
                runway: "27L"
            },
            arrival: {
                runway: "27L",
                exitTaxiway: "Charlie",
                taxiRoute: "via Charlie and Alpha to Gate 501"
            }
        },
        KJFK: {
            departure: {
                gate: "Gate 1",
                taxiRoute: "via Alpha, Bravo, and Papa",
                runway: "4L"
            },
            arrival: {
                runway: "4L",
                exitTaxiway: "Papa",
                taxiRoute: "via Papa and Bravo to Gate 1"
            }
        },
        KORD: {
            departure: {
                gate: "HI2",
                taxiRoute: "via Bravo 1, November, and Zulu",
                runway: "10L"
            },
            arrival: {
                runway: "10L",
                exitTaxiway: "Zulu",
                taxiRoute: "via Zulu and November to HI2"
            }
        },
        KBOS: {
            departure: {
                gate: "A1",
                taxiRoute: "via Alpha and Bravo",
                runway: "4R"
            },
            arrival: {
                runway: "4R",
                exitTaxiway: "Charlie",
                taxiRoute: "via Charlie and Alpha to Gate A1"
            }
        },
        KPVD: {
            departure: {
                gate: "Gate 1",
                taxiRoute: "via Alpha",
                runway: "5"
            },
            arrival: {
                runway: "5",
                exitTaxiway: "Bravo",
                taxiRoute: "via Bravo to Gate 1"
            }
        },
        KMHT: {
            departure: {
                gate: "Gate 1",
                taxiRoute: "via Alpha",
                runway: "6"
            },
            arrival: {
                runway: "6",
                exitTaxiway: "Charlie",
                taxiRoute: "via Charlie and Alpha to Gate 1"
            }
        },
        LFPG: {
            departure: {
                gate: "Gate F21",
                taxiRoute: "via Delta and Golf",
                runway: "26R"
            },
            arrival: {
                runway: "26R",
                exitTaxiway: "Golf",
                taxiRoute: "via Golf and Delta to Gate F21"
            }
        },
        EGKK: {
            departure: {
                gate: "Gate 13",
                taxiRoute: "via Alpha and Bravo",
                runway: "26L"
            },
            arrival: {
                runway: "26L",
                exitTaxiway: "Charlie",
                taxiRoute: "via Charlie and Alpha to Gate 13"
            }
        },
        KSFO: {
            departure: {
                gate: "Gate F15",
                taxiRoute: "via Alpha, Bravo, and Charlie",
                runway: "28R"
            },
            arrival: {
                runway: "28R",
                exitTaxiway: "Golf",
                taxiRoute: "via Golf and Bravo to Gate F15"
            }
        },
        KMIA: {
            departure: {
                gate: "Gate D10",
                taxiRoute: "via Lima, Sierra, and Tango",
                runway: "8R"
            },
            arrival: {
                runway: "8R",
                exitTaxiway: "Sierra",
                taxiRoute: "via Sierra and Lima to Gate D10"
            }
        },
        KSJC: {
            departure: {
                gate: "Gate 18",
                taxiRoute: "via Alpha and Bravo",
                runway: "30R"
            },
            arrival: {
                runway: "30R",
                exitTaxiway: "Charlie",
                taxiRoute: "via Charlie and Alpha to Gate 18"
            }
        },
        KDFW: {
            departure: {
                gate: "Gate C20",
                taxiRoute: "via Yankee, Bravo, and Lima",
                runway: "17R"
            },
            arrival: {
                runway: "17R",
                exitTaxiway: "Lima",
                taxiRoute: "via Lima and Bravo to Gate C20"
            }
        },
        KCLT: {
            departure: {
                gate: "Gate A8",
                taxiRoute: "via Alpha and Juliet",
                runway: "18C"
            },
            arrival: {
                runway: "18C",
                exitTaxiway: "Juliet",
                taxiRoute: "via Juliet and Alpha to Gate A8"
            }
        },
        KPHX: {
            departure: {
                gate: "Gate 15",
                taxiRoute: "via Sierra and Bravo",
                runway: "8"
            },
            arrival: {
                runway: "8",
                exitTaxiway: "Bravo",
                taxiRoute: "via Bravo and Sierra to Gate 15"
            }
        },
        KSEA: {
            departure: {
                gate: "Gate D6",
                taxiRoute: "via Alpha, Bravo, and Charlie",
                runway: "16L"
            },
            arrival: {
                runway: "16L",
                exitTaxiway: "Charlie",
                taxiRoute: "via Charlie and Bravo to Gate D6"
            }
        }
    };

    // Get airport info or fallback to generic
    function getAirportInfo(airport) {
        const code = airport.trim().toUpperCase();
        return airportData[code] || {
            departure: {
                gate: "A1",
                taxiRoute: "via Alpha",
                runway: "the active runway"
            },
            arrival: {
                runway: "the active runway",
                exitTaxiway: "Alpha",
                taxiRoute: "via Alpha to Gate A1"
            }
        };
    }

    // Function to give full taxi instructions for departure
    function giveDepartureInstructions(airport) {
        const info = getAirportInfo(airport).departure;
        document.getElementById('atc-panel-message').innerText =
            `Pushback approved from ${info.gate}. Taxi ${info.taxiRoute} to runway ${info.runway} at ${airport.toUpperCase()}. Hold short and contact tower when ready for departure.`;
    }

    // Function to give full taxi instructions for landing
    function giveLandingInstructions(airport) {
        const info = getAirportInfo(airport).arrival;
        document.getElementById('atc-panel-message').innerText =
            `Cleared to land on runway ${info.runway} at ${airport.toUpperCase()}. After landing, exit via taxiway ${info.exitTaxiway}, then taxi ${info.taxiRoute}. Welcome!`;
    }

    // Function to handle airport request and ask for operation type
    function handleAirportRequest(airport) {
        const operation = prompt(`Are you departing or landing at ${airport}? (Type "departing" or "landing")`);
        if (operation) {
            if (operation.toLowerCase() === "departing") {
                giveDepartureInstructions(airport);
            } else if (operation.toLowerCase() === "landing") {
                giveLandingInstructions(airport);
            } else {
                document.getElementById('atc-panel-message').innerText =
                    `Requested: ${airport} (operation not specified)`;
            }
        } else {
            document.getElementById('atc-panel-message').innerText =
                `Requested: ${airport} (operation not specified)`;
        }
    }

    function createATCPanel() {
        // Remove existing panel if present to prevent overlap
        const existingPanel = document.getElementById('geofs-atc-panel');
        if (existingPanel) {
            existingPanel.remove();
        }

        const atcPanel = document.createElement('div');
        atcPanel.id = 'geofs-atc-panel';
        atcPanel.style.position = 'fixed';
        atcPanel.style.top = '80px';
        atcPanel.style.right = '20px';
        atcPanel.style.width = '320px';
        atcPanel.style.background = 'rgba(0,0,0,0.85)';
        atcPanel.style.color = '#fff';
        atcPanel.style.padding = '14px';
        atcPanel.style.zIndex = 9999;
        atcPanel.style.borderRadius = '8px';
        atcPanel.style.cursor = 'pointer';
        atcPanel.innerHTML = `<strong>ATC Panel</strong><br><span id="atc-panel-message">Click here for ATC assistance</span>`;

        atcPanel.addEventListener('click', function() {
            const airport = prompt('Which airport do you require? (e.g. KLAX, EGLL, KJFK, KORD, KBOS, KPVD, KMHT, LFPG, EGKK)');
            if (airport) {
                handleAirportRequest(airport);
            }
        });

        document.body.appendChild(atcPanel);
    }

    // Main execution
    initATC();
    setInterval(manageAirTraffic, 5000);
    displayInfo();
    interactWithGeoFS();
    createATCPanel();

})();
