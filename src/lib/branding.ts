export const printBranding = () => {
  const asciiArt = `
 _             _                                       
| |           | |  Tushar's Personal Website                                    
| |_ _   _ ___| |__   __ _  __ _ _   _ _ __ __ ___   __
| __| | | / __| '_ \\ / _\` |/ _\` | | | | '__/ _\` \\ \\ / /
| |_| |_| \\__ \\ | | | (_| | (_| | |_| | | | (_| |\\ V / 
 \\__|\\__,_|___/_| |_|\\__, |\\__,_|\\__,_|_|  \\__,_| \\_/  
                      __/ |                            
                     |___/  (C) Tushar Gaurav ${new Date().getFullYear()}                          
`
  console.log(asciiArt)
}
