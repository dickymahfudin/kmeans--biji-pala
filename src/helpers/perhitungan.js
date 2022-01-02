const kategori = ['kondisi', 'bunyi', 'serangga', 'jamur'];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const jarak = (centroid, datas) => {
  return datas.map((data, index) => {
    const latex = [];
    const temp = kategori.map((e, i) => {
      latex.push(`(${centroid[i]}-${data[e]}^2)`);
      return Math.pow(centroid[i] - data[e], 2);
    });
    const sum = temp.reduce(reducer);
    const sqrt = +Math.sqrt(sum).toFixed(3);
    return { latex: latex.join('+'), sqrt };
  });
};

const pengelompokan = (jarak1, jarak2, jarak3) => {
  const klaster1 = [];
  const klaster2 = [];
  const klaster3 = [];
  for (let i = 0; i < jarak1.length; i++) {
    const kelompok = [jarak1[i].sqrt, jarak2[i].sqrt, jarak3[i].sqrt];
    const index = kelompok.indexOf(Math.min(...kelompok));
    if (index === 0) klaster1.push(i + 1);
    if (index === 1) klaster2.push(i + 1);
    if (index === 2) klaster3.push(i + 1);
  }
  return { klaster1, klaster2, klaster3 };
};

const sumKatagori = (arr, param) => {
  const matrix = arr.map(val => val[param]);
  const sum = +(matrix.reduce(reducer) / arr.length).toFixed(3);
  const latex = matrix.join('+');
  return { latex, sum, count: matrix.length };
};

const centroid = (klasters, datas) => {
  const klaster = klasters.map(klaster => datas[klaster - 1]);
  const centroid = kategori.map((katagori, i) => {
    return sumKatagori(klaster, katagori);
  });
  return centroid;
};

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const arrayCentroid = centroid => {
  return kategori.map(e => {
    return centroid[e];
  });
};

module.exports = data => {
  const length = data.length;
  const min = Math.floor(length / 3);
  const max = Math.ceil(length / 3);
  let c1 = arrayCentroid(data[0]);
  let c2 = arrayCentroid(data[8]);
  let c3 = arrayCentroid(data[5]);
  const result = [];
  let a = 0;
  let tempC1, tempC2, tempC3;
  for (let i = 0; i < 10; i++) {
    if (equals(c1, tempC1) && equals(c2, tempC2) && equals(c2, tempC2)) {
      break;
    } else {
      console.log(i);
      const jarak1 = jarak(c1, data);
      const jarak2 = jarak(c2, data);
      const jarak3 = jarak(c3, data);
      const pengulangan = pengelompokan(jarak1, jarak2, jarak3);
      const centroidBaru1 = centroid(pengulangan.klaster1, data);
      const centroidNew1 = centroidBaru1.map(e => e.sum);
      const centroidBaru2 = centroid(pengulangan.klaster2, data);
      const centroidNew2 = centroidBaru2.map(e => e.sum);
      const centroidBaru3 = centroid(pengulangan.klaster3, data);
      const centroidNew3 = centroidBaru3.map(e => e.sum);
      result.push({
        jarak1,
        jarak2,
        jarak3,
        pengulangan,
        centroidBaru1,
        centroidBaru2,
        centroidBaru3,
        centroidNew1,
        centroidNew2,
        centroidNew3,
      });
      a += 1;
      tempC1 = c1;
      c1 = [...centroidNew1];
      tempC2 = c2;
      c2 = [...centroidNew2];
      tempC3 = c3;
      c3 = [...centroidNew3];
    }
  }
  const table1 = result[result.length - 1].pengulangan.klaster1.map(e => data[e - 1]);
  const table2 = result[result.length - 1].pengulangan.klaster2.map(e => data[e - 1]);
  const table3 = result[result.length - 1].pengulangan.klaster3.map(e => data[e - 1]);

  return { result, table1, table2, table3 };
};
