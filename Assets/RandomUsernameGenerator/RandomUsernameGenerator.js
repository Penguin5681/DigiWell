export const generateRandomUsername = () => {
    const randomUsernames = [
        'CoolCucumber21', 'BrightButterfly99', 'MightyMango32', 'SilentStorm42', 'GoldenGiraffe11',
        'SwiftShadow88', 'WittyWizard73', 'FieryFalcon27', 'GentleGiant15', 'ElectricEagle56',
        'FunkyFalcon94', 'JollyJester78', 'LivelyLion35', 'CleverCat89', 'MellowMonkey52',
        'NimbleNinja24', 'SassySparrow67', 'PluckyPanda13', 'RadiantRabbit81', 'SunnySeal26',
        'VividViper44', 'ZealousZebra68', 'BouncyBear39', 'DaringDolphin55', 'EagerElephant77',
        'FrothyFox29', 'GloriousGoat82', 'HappyHawk46', 'IcyIguana31', 'JazzyJaguar25',
        'KindKoala63', 'LuckyLynx48', 'MerryMantis95', 'NobleNarwhal54', 'OptimisticOtter19',
        'ProudPenguin40', 'QuickQuokka17', 'RadiantRaven36', 'SpeedySwan65', 'TidyTiger72',
        'UniqueUnicorn38', 'VibrantVulture50', 'WiseWalrus74', 'XenialXerus47', 'YearningYak28',
        'ZippyZebu62', 'AgileAlpaca70', 'BraveBadger60', 'CuriousCheetah85', 'DiligentDingo34',
        'EnergeticEel22', 'FancyFerret53', 'GentleGazelle37', 'HonestHornet43', 'InventiveIbis79',
        'JoyfulJellyfish14', 'KeenKangaroo76', 'LoyalLlama33', 'MightyMoose66', 'NimbleNewt18',
        'ObedientOrca12', 'PlayfulPeacock23', 'QuietQuail10', 'RadiantReindeer69', 'SharpShark49',
        'ToughToucan84', 'UpliftedUakari71', 'ValiantVixen51', 'WittyWeasel57', 'XtraXenops30',
        'YoungYak45', 'ZealousZorilla75', 'ActiveAnteater41', 'BriskBeaver58', 'CalmCougar86',
        'DaringDragonfly20', 'EffervescentEmu64', 'FluffyFlamingo87', 'GutsyGiraffe61', 'HeartyHedgehog16',
        'ImaginativeImpala91', 'JollyJackal83', 'KindlyKoala59', 'LivelyLark80', 'MajesticMoth26',
        'NobleNighthawk90', 'OptimisticOwl92', 'ProudPuma93', 'QuickQuokka17', 'ResilientRooster98',
        'SpunkySparrow97', 'TenaciousTurtle96', 'UniqueUmbrella95', 'VigorousViper94', 'WittyWhale93',
        'XenodochialXerus92', 'YouthfulYeti91', 'ZestfulZebu90', 'AgileArmadillo89', 'BraveBuffalo88'
    ]

    return randomUsernames[Math.floor(Math.random() * 100)]; // Generates a random username from idx 0 -> 99
};
