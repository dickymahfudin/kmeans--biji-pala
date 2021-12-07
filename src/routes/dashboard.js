const express = require('express');
const perhitungan = require('../helpers/perhitungan');
const jsonToTable = require('../helpers/jsonToTable');
const { pala } = require('../models');
const router = express.Router();
const forms = [
  {
    name: 'kondisi',
    pl: 'Kondisi biji',
    data: [
      { name: 'utuh, padat, halus', value: 1, select: false },
      { name: 'utuh, padat, keriput', value: 2, select: false },
      { name: 'utuh atau pecah', value: 3, select: false },
    ],
  },
  {
    name: 'bunyi',
    pl: 'Bunyi',
    data: [
      { name: 'keras saat diketuk', value: 1, select: false },
      { name: 'kurang keras', value: 2, select: false },
      { name: 'tidak keras', value: 3, select: false },
    ],
  },
  {
    name: 'serangga',
    pl: 'Serangga',
    data: [
      { name: 'tidak ada', value: 1, select: false },
      { name: 'ada', value: 2, select: false },
    ],
  },
  {
    name: 'jamur',
    pl: 'Jamur',
    data: [{ name: 'tidak', value: 1, select: false }],
  },
];

const getTable = async table => {
  const dataPala = await pala.findAll({ raw: true });
  const rumus = perhitungan(dataPala);
  return rumus[table].map(pala => {
    const kondisi = forms.find(e => e.name === 'kondisi').data.find(e => e.value === pala.kondisi).name;
    const bunyi = forms.find(e => e.name === 'bunyi').data.find(e => e.value === pala.bunyi).name;
    const serangga = forms.find(e => e.name === 'serangga').data.find(e => e.value === pala.serangga).name;
    const jamur = forms.find(e => e.name === 'jamur').data.find(e => e.value === pala.jamur).name;

    return { id: pala.id, name: pala.name, kondisi, bunyi, serangga, jamur };
  });
};

router.get('/', async (req, res, next) => {
  const dataPala = await pala.findAll();
  const rumus = perhitungan(dataPala);
  return res.render('dashboard', { title: 'Dashboard', rumus, dataPala });
});

router.get('/table1', async (req, res, next) => {
  return res.json(jsonToTable(await getTable('table1')));
});
router.get('/table2', async (req, res, next) => {
  return res.json(jsonToTable(await getTable('table2')));
});
router.get('/table3', async (req, res, next) => {
  return res.json(jsonToTable(await getTable('table3')));
});

module.exports = router;
