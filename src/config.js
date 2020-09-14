export default {
    jwtSecret: 'MIICWwIBAAKBgQCcIJwgf/Udo2sLFEJgpePBAzSz4//02K3U4JV3qX0O8eegWRp',
    GOOGLE_CONFIG : {
        clientID : "687449730279-l0ph8no3oddt2d67pp3bdl4d8ljukqqd.apps.googleusercontent.com",
        clientSecret : "HbWMpo0pHtXj7DBkLvAijB9o",
        callbackURL : 'https://simplyopen.in/api/auth/google/callback'
    },
    FACEBOOK_CONFIG: {
        clientID : "1107043689667416",
        clientSecret : "f91eea3f89e8d7e3bbedb503d1d03382",
        callbackURL : 'https://simplyopen.in/api/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email'],
        enableProof: true
    }
}