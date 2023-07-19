/* eslint-disable */
import { 
routeExists, 
routeAbsolute,
isDirectory,  
getMdExtension, 
readFiles, 
getLinks, 
linksFalse, 
peticionHTTP,
getStatsFromLinks } from "../index.js";
import path from 'path'


describe('routeExists', () => {
  it('deberia ser una funcion', () => {
  expect(typeof routeExists).toBe('function');
  });

  it('deberia retornar true si la ruta existe', async () => {
  expect(routeExists('./Routes/Route2carpeta/Prueba3.md')).toBe(true);
  });

  it('deberia retornar false si la ruta existe', async () => {
    expect(routeExists('./Routes/Route2carpet/Prueba3.md')).toBe(false);
  })
});


describe('routeAbsolute', () => {
  it('deberia ser una funcion', () => {
  expect(typeof routeAbsolute).toBe('function');
  });
});

describe('routeAbsolute', () => {
  it('deberia retorna la ruta absoluta', async () => {
    const abosulta = path.resolve('Routes\Route2carpeta\Prueba3.md')
    expect(routeAbsolute('Routes\Route2carpeta\Prueba3.md')).toEqual(abosulta)
  });

  it('deberia retorna la misma ruta si esta ya es absoluta', async () => {
    const archivo = '/Users/ACER/DEV007-md-links/Routes/Route2carpeta/Prueba3.md'
    expect(routeAbsolute(archivo)).toEqual(archivo)
  });
});

describe('isDirectory', () => {
  it('deberia ser una funcion', () => {
  expect(typeof isDirectory).toBe('function');
  });
});

describe('isDirectory', () => {
  it('deberia decir true si es un archivo', async () => {
    const archivo = 'Routes\\Route2carpeta\\Prueba3.md'
    const result = isDirectory(archivo)
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toBe(archivo);
  })
})


describe('getMdExtension', () => {
  it('deberia ser una funcion', () => {
  expect(typeof getMdExtension).toBe('function');
  });
});

describe('getMdExtension', () => {
  it('deberia filtrar los documentos MD', async () =>{
    const arrayFiles = ['Routes\\Route2carpeta\\Prueba3.md', 'Routes\\Route2carpeta\\Prueba3.js']
    const filter = getMdExtension(arrayFiles)
    expect(filter).toEqual(['Routes\\Route2carpeta\\Prueba3.md'])
  })
});

describe('readFiles', () => {
  it('deberia ser una funcion', () => {
  expect(typeof readFiles).toBe('function');
  });
});

describe('readFiles', () => {
it('deberia leer el contenido del documento', async () => {
  const arrayFiles = ['Routes\\Route2carpeta\\Prueba3.md'];
  
  const expectedResults = [
    'Hola soy un documento md y necesito ser leido [Markdown](https://es.wikipedia.org/wiki/Markdown)'
  ];
    console.log(expectedResults, 100);

  const actualResults = await readFiles(arrayFiles);
  expect(actualResults).toEqual(expectedResults);
});
});


describe("getLinks", () => {
  it("retorna un array con los links de un archivo", async () => {
    const archivos = [
      'Hola soy un documento md y necesito ser leido' +
      '[Markdown](https://es.wikipedia.org/wiki/Markdown)'    
    ];

    const result = [
      '[Markdown](https://es.wikipedia.org/wiki/Markdown)',
      ];

    expect(getLinks(archivos)).toStrictEqual(result);
  });
});


describe('linksFalse', () => {
  it('deberia retorna un array con los links validados', async() => {
    const archivos = [
      '[Markdown](https://es.wikipedia.org/wiki/Markdown)',
    ]

    const result = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\ACER\\DEV007-md-links'
      },  
    ]
    expect(linksFalse(archivos)).toStrictEqual(result)
  });
});


describe('getStatsFromLinks', () => {
  it('deberia retornar la estadistica de los links', async () => {
    const arrObjs = [
      { href: 'https://example.com/page1', mensaje: 'OK' },
      { href: 'https://example.com/page2', mensaje: 'OK' },
      { href: 'https://example.com/page3', mensaje: 'OK' },
    ];
    const isOptionValidate = false;
    const expectedStats = {
      total: 3,
      unique: 3,
    };
    const actualStats = await getStatsFromLinks(arrObjs, isOptionValidate);
    expect(actualStats).toEqual(expectedStats);
  });
  it('should return correct stats with validation', async () => {
    const arrObjs = [
      { href: 'https://example.com/page1', mensaje: 'OK' },
      { href: 'https://example.com/page2', mensaje: 'Fail' },
      { href: 'https://example.com/page3', mensaje: 'OK' },
      { href: 'https://example.com/page4', mensaje: 'OK' },
    ];
    const isOptionValidate = true;
    const expectedStats = {
      total: 4,
      unique: 4,
      working: 3,
      broken: 1,
    };
    const actualStats = await getStatsFromLinks(arrObjs, isOptionValidate);
    expect(actualStats).toEqual(expectedStats);
  });
});


describe('peticionHTTP', () => {
  it('Es una función', () => {
    expect(typeof peticionHTTP).toBe('function');
  });
  it("Deberia retornar un array de promesas", async () => {
    const arrObject = [
      { href: "https://www.google.com" },
    ];
    const results = await peticionHTTP(arrObject).then(result => result);
      expect(results).toEqual([
        {
          href: "https://www.google.com",
          status: 200,
          mensaje: "OK",
        },
      ]);
    
});
});

it("Debería arrojar error", async () => {
  const url = [
    { href: "https://www.google.com" },
    { href: "https://www.example.com/404" },
  ];
  const results = await peticionHTTP(url);
  expect(results[0].status).toBe(200);
  expect(results[0].mensaje).toBe("OK");
  expect(results[1].status).toBe(404);
  expect(results[1].mensaje).toBe("Fail");
});