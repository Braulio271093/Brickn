require.config({
    baseUrl: 'baseT-js',
  shim : {
    grupClass: {
        exports : 'Clases/Grup'
    },
    usuariClass : {
        deps: ['grupClass'],
        exports : 'Usuari'
    }
  }
});