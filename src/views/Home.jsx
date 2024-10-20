const React = require('react');
const Layout = require('./Layout');

module.exports = function Home(props) {
  const { categories } = props;
  const advantages = [
    { href: 'https://ipro.etm.ru/upload/document2/1704877672474.png', name: 'Единый комплексный поставщик инженерных систем' },
    { href: 'https://ipro.etm.ru/upload/document2/1704873456631.png', name: 'Прозрачные сроки поставки' },
    { href: 'https://ipro.etm.ru/upload/document2/1704875978892.png', name: 'Скидки, баллы, акции для вашей выгоды' },
    { href: 'https://ipro.etm.ru/upload/document2/1704876154771.png', name: 'Экспресс-доставка на объект за 2 часа' },
  ];
  const testProducts = [
    {
      id: 13,
      categoryId: 9,
      name: 'Винт с крестообразным шлицем М6х10 СМ010610',
      productCode: '9752624',
      manufacturerId: 6,
      price: 1,
      quantityInStock: 3232,
      characteristics: {},
      description: '',
      imgPath: '/photos/Винт-с-крестообразным-шлицем-М6х10-СМ010610.jpeg',
    },
    {
      id: 7,
      categoryId: 9,
      name: 'Держатель с защелкой 20 мм для труб',
      productCode: '9533870',
      manufacturerId: 6,
      price: 1,
      quantityInStock: 2000,
      characteristics: {},
      description: '',
      imgPath: '/photos/Держатель-с-защелкой-20-мм-для-труб.jpeg',
    },
    {
      id: 3,
      categoryId: 21,
      name: 'Кабель ППГ нг(А)HF 3х1.5 0.66кВ',
      productCode: '9239253',
      manufacturerId: 2,
      price: 4,
      quantityInStock: 10000,
      characteristics: {},
      description: '',
      imgPath: '/photos/Кабель-ППГ-нг(А)HF-3х1.5-0.66кВ.jpeg',
    },
    {
      id: 1,
      categoryId: 21,
      name: 'Кабель силовой ВВГнг(А)-LS 3х1.5пл-0.66 ТРТС',
      productCode: '5301409',
      manufacturerId: 1,
      price: 2,
      quantityInStock: 333333,
      characteristics: {},
      description:
        'Не распространяющие горение, с низким дымо- и газовыделением предназначены для передачи и распределения электроэнергии в стационарных установках на номинальное переменное напряжение 0,66 кВ и 1 кВ частоты 50 Гц. Кабели изготавливаются для общепромышленного применения и атомных станций при поставках на внутренний рынок и на экспорт. Кабели предназначены для эксплуатации в кабельных сооружениях и помещениях, в том числе для использования в системах атомных станций классов 2, 3 и 4 по классификации ОПБ-88/97 (ПНАЭ Г-01-011-97).',
      imgPath: '/photos/Кабель-силовой-ВВГнг(А)-LS-3х1.5пл-0.66-ТРТС.jpeg',
    },
    {
      id: 4,
      categoryId: 21,
      name: 'Кабель силовой ВВГп-нг(А)-LS 3х2.5 (барабан) -0.660 ТРТС',
      productCode: '4997606',
      manufacturerId: 3,
      price: 5,
      quantityInStock: 900,
      characteristics: {},
      description: '',
      imgPath: '/photos/Кабель-силовой-ВВГп-нг(А)-LS-3х2.5-(барабан)--0.660-ТРТС.jpeg',
    },
    {
      id: 2,
      categoryId: 35,
      name: 'Кабель силовой ППГнг(А)-HF 3х2.5-0.66 одно проволочный ТРТС',
      productCode: '2306044',
      manufacturerId: 1,
      price: 4,
      quantityInStock: 25000,
      characteristics: {},
      description: '',
      imgPath: '/photos/Кабель-силовой-ППГнг(А)-HF-3х2.5-0.66-одно-проволочный-ТРТС.jpeg',
    },
    {
      id: 8,
      categoryId: 9,
      name: 'Клемма СМК 222-413 с рычагом 3 отверстия 0,08-2,5(4.0)мм2 (100шт.)',
      productCode: '570769',
      manufacturerId: 7,
      price: 2,
      quantityInStock: 12322,
      characteristics: {},
      description: '',
      imgPath: '/photos/Клемма-СМК-222-413-с-рычагом-3-отверстия-0,08-2,5(4.0)мм2-(100шт.).jpeg',
    },
    {
      id: 9,
      categoryId: 9,
      name: 'Клемма строительно-монтажная СМК 2273-243 PROxima с пастой 3 отверстия 0.5-2.5мм.кв. (100шт)',
      productCode: '483297',
      manufacturerId: 8,
      price: 2,
      quantityInStock: 123123,
      characteristics: {},
      description: '',
      imgPath:
        '/photos/Клемма-строительно-монтажная-СМК-2273-243-PROxima-с-пастой-3-отверстия-0.5-2.5мм.кв.-(100шт).jpeg',
    },
    {
      id: 5,
      categoryId: 9,
      name: 'Комплект соединительный М6х10 КС',
      productCode: '7230466',
      manufacturerId: 4,
      price: 1,
      quantityInStock: 10000,
      characteristics: {},
      description: '',
      imgPath: '/photos/Комплект-соединительный-М6х10-КС.jpeg',
    },
    {
      id: 6,
      categoryId: 9,
      name: 'Наконечник кабельный кольцевой изолированный НКИ 6.0-6 серия ПРОФИ',
      productCode: '106500487',
      manufacturerId: 5,
      price: 1,
      quantityInStock: 11112,
      characteristics: {},
      description: '',
      imgPath: '/photos/Наконечник-кабельный-кольцевой-изолированный-НКИ-6.0-6-серия-ПРОФИ.jpeg',
    },
    {
      id: 12,
      categoryId: 9,
      name: 'Наконечник штыревой втулочный изолированный НШВИ(2) 0.75-8',
      productCode: '2530140',
      manufacturerId: 5,
      price: 3,
      quantityInStock: 13424,
      characteristics: {},
      description: '',
      imgPath: '/photos/Наконечник-штыревой-втулочный-изолированный-НШВИ(2)-0.75-8.jpeg',
    },
    {
      id: 11,
      categoryId: 9,
      name: 'Провод силовой ПуГВ нг(А)LS 1х0.75 черный (бухта) ТРТС',
      productCode: '1724824',
      manufacturerId: 2,
      price: 2,
      quantityInStock: 123123,
      characteristics: {},
      description: '',
      imgPath: '/photos/Провод-силовой-ПуГВ-нг(А)LS-1х0.75-черный-(бухта)-ТРТС.jpeg',
    },
  ];

  return (
    <Layout {...props}>
      <main className="home-main">
        <h2>Категории</h2>
        <ul className="categories categories-slider">
          {categories.map((category) => (
            <a className="category-link" href={`/category/${category.name}`}>
              <li>
                <img className="category-img" src={`${category.photoPath}`} alt="" />
                <p>{category.name}</p>
              </li>
            </a>
          ))}
        </ul>

        <h2>Хиты продаж</h2>
        <ul className="categories categories-slider">
          {testProducts.map((el) => (
            <li className="hit">
              <img src={el.imgPath} alt="" />
              <a className="hit-info" href={`/products/${el.categoryId}/${el.productCode}`}>
                {el.name}
              </a>

              <div className="buy-hit">
                <div className="price">
                  <p className="first-price">{el.price} Лари</p>
                  {/* <p className="past-price">прошлая цена</p> */}
                </div>
                <div className="add-cart">
                  <form name="addBasket" className="into add-cart addBasket">
                    <input type="number" name="quantity" id="" />
                    <p>шт</p>
                    <button type="submit">В корзину</button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="advantages">
          <h2>Преимущества работы снами</h2>
          <ul>
            {advantages.map((advantage) => (
              <li>
                <img src={advantage.href} alt="" />
                <p>{advantage.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Layout>
  );
};
