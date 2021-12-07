const express = require('express');
const router = express.Router();
const { pala } = require('../models');
const jsonToTable = require('../helpers/jsonToTable');

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

router.get('/', (req, res, next) => {
  res.render('pala/index', { title: 'Data Pala' });
});

router.post('/', async (req, res, next) => {
  const data = req.body;
  const findPala = await pala.findOne({
    where: {
      name: data.name,
    },
  });
  if (findPala) {
    req.flash('error', 'Nama Tidak Boleh Sama');
    return res.redirect('/pala');
  }
  req.flash('success', 'Data Berhasil Di Tambahkan');
  await pala.create(data);
  res.redirect('/pala');
});

router.post('/:id', async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  const findPala = await pala.findOne({ where: { id } });
  findPala.update(data);
  req.flash('success', 'Data Berhasil Di ubah');
  res.redirect('/pala');
});

router.get('/table', async (req, res, next) => {
  const palas = await pala.findAll();
  const newPalas = palas.map(pala => {
    const kondisi = forms.find(e => e.name === 'kondisi').data.find(e => e.value === pala.kondisi).name;
    const bunyi = forms.find(e => e.name === 'bunyi').data.find(e => e.value === pala.bunyi).name;
    const serangga = forms.find(e => e.name === 'serangga').data.find(e => e.value === pala.serangga).name;
    const jamur = forms.find(e => e.name === 'jamur').data.find(e => e.value === pala.jamur).name;

    return { id: pala.id, name: pala.name, kondisi, bunyi, serangga, jamur };
  });
  res.json(jsonToTable(newPalas));
});

router.get('/form', (req, res, next) => {
  forms.map(form => {
    form.data = form.data.map(e => {
      e.select = false;
      return e;
    });
    return form;
  });
  res.render('pala/form', { title: 'Data Pala', action: '/pala', forms, name: '' });
});

router.get('/form/:id', async (req, res, next) => {
  const id = req.params.id;
  const palas = await pala.findByPk(id);
  const newForm = forms.map(form => {
    const value = palas[form.name];
    const check = form.data.find(e => e.value === value);
    check.select = true;
    return form;
  });
  res.render('pala/form', { title: 'Data Pala', action: `/pala/${id}`, forms: newForm, name: palas.name });
});

router.get('/delete/:id', async (req, res, next) => {
  const id = req.params.id;
  const findPala = await pala.findByPk(id);
  await findPala.destroy();
  req.flash('success', 'Data Berhasil Dihapus');
  return res.redirect('/pala');
});

module.exports = router;
