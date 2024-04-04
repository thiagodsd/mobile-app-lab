import React from 'react';
import Header from './Header';
import Services from './Services';

import paso_00 from './img/void.jpg';
import paso_01 from './img/01.jpg';
import paso_02 from './img/02.jpg';
import paso_03 from './img/03.jpg';
import paso_04 from './img/04.jpg';
import paso_05 from './img/05.jpg';
import paso_06 from './img/06.jpg';

import img_00 from './img/img_00.jpg';
// import img_01 from './img/img_01.jpg';

import canva_01 from './img/canva_01.png';
import canva_02 from './img/canva_02.png';
import canva_03 from './img/canva_03.png';

function HomePage() {
    const pasos = [
        {
            name: 'Primer Paso',
            description: 'Macaron de api, paté de hongos, tierra de perejil. Maridamos con Fuego Blanco Malbec-Syrah / Upgrade: Satélite Seda de Plutón',
            price: '39.000',
            image: paso_00
        },
        {
            name: 'Segundo Paso',
            description: 'Embutidos artesanales Abrasado. Maridamos con Margarita para los Chanchos Nat Charmat / Upgrade: Fuego Blanco Flinstone Malbec',
            price: '26.500',
            image: paso_01
        },
        {
            name: 'Tercer Paso',
            description: 'Tartar Angus coronados con yema cruda, sobre macarrón. Maridamos con Fuego Blanco Flinstone Cabernet Franc / Upgrade: Descendiente de los Monos Música de Loica.',
            price: '84.000',
            image: paso_02
        },
        {
            name: 'Cuarto Paso',
            description: 'Filet madurado en alga combu. Guarnición Miso y Chutney de duraznos. Maridamos con Mosquita Muerta Blend de Tintas / Upgrade: Mosquita Muerta Black Malbec',
            price: '121.000',
            image: paso_03
        },
        {
            name: 'Principal',
            description: 'T-bone madurado en ajo negro✩ Guarnición: Remolacha, zanahoria y naranjas asadas y praliné picante. Espuma de ajo negro. Maridamos con Mosquita Muerta Malcriado / Upgrade: La Cúpula',
            price: '198.500',
            image: paso_04
        },
        {
            name: 'Postre',
            description: 'Pera en polen y parfait de miso de porotos negros. Maridamos con Cordero con Piel de Lobo Demi Sec / Upgrade: Maison Toto Sweet',
            price: '48.500',
            image: paso_05
        },
        {
            name: 'Café',
            description: 'Degustación de bocados dulces. Café de especialidad o Té. Incluye un agua con/sin gas Acqua Panna ó San Pellegrino.',
            price: '24.000',
            image: paso_06
        },
        {
            name: 'o bumble tinha razão',
            description: 'uma pessoa incrível estava esperando o início da conversa e como o senhor charles-augustin de coulomb já havia enunciado em 1785: os dispostos se atraem',
            price: 'não tem',
            image: img_00
        },
    ];

    const nosotros = [
        {
            name: ' ',
            description: '',
            price: '',
            image: paso_00
        },
        // {
        //     name: 'pela lei de coulomb',
        //     description: 'os dispostos se atraem',
        //     price: 'não tem',
        //     image: img_01
        // },
        // {
        //     name: 'y paso a paso hemos caminado',
        //     description: 'separados & juntos & veces muy deprisa & des-pa-cito & com carinho & endurecidos & sin perder la ternura jamás',
        //     price: '',
        //     image: paso_00
        // },
        // {
        //     name: 'siempre "y" nunca "o"',
        //     description: 'usando nossas contradições para superar nossas contradições sem a menor vontade de abandonar as nossa contradições',
        //     price: '',
        //     image: paso_00
        // },
        // {
        //     name: '',
        //     description: '',
        //     price: 'não tem',
        //     image: canva_01
        // },
        {
            name: 'paso a paso hemos caminado',
            description: 'separados & juntos & muy deprisa & des-pa-cito & endurecidos & sin perder la ternura jamás',
            price: '',
            image: canva_01
        },
        {
            name: 'siempre "y" nunca "o"',
            description: 'usando as nossas contradições para superar as nossas contradições sem a menor vontade de abandonar as nossa contradições',
            price: '',
            image: canva_02
        },
        {
            name: '',
            description: '',
            price: '',
            image: canva_03
        },
        // {
        //     name: '',
        //     description: 'separados & juntos & veces muy deprisa & des-pa-cito & com carinho & endurecidos & sin perder la ternura jamás',
        //     price: '',
        //     image: paso_00
        // },
    ];

    return (
        <div>
            <Header />
            <Services title="Pasos" items={pasos} />
            <br/><br/><br/>
            <Services title="Pasos sin Precio" items={nosotros} />
            <div className="footer" style={{textAlign: 'center'}}>
                <p>
                    e talvez essas fotografias representem a maior contradição da nossa jornada até aqui
                </p>
                <br/>
                <p>
                    porque esse tipo de fotografia materializa o desejo de eternizar a beleza da felicidade
                </p>
                <br/>
                <p>
                    mas esse desejo nunca me atravessou
                </p>
                <br/>
                <p>
                    porque desejo é falta e do seu lado não me falta nada
                </p>
                    <br/><br/><br/>
                <p>
                    eu amo você
                </p>
                    <br/><br/><br/>
                <p>
                    e quero eternizar esse amor
                </p>
                    <br/><br/><br/>
                <p>
                    só que não através de uma fotografia...
                </p>
                
            </div>
        </div>
    );
}

export default HomePage;
