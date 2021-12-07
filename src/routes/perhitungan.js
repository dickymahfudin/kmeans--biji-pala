const express = require('express');
const perhitungan = require('../helpers/perhitungan');
const { pala } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const dataPala = await pala.findAll();
  const rumus = perhitungan(dataPala);
  return res.render('perhitungan', { title: 'Perhitungan', rumus });
});

router.get('/hitung', async (req, res, next) => {
  const dataPala = await pala.findAll();
  const hitung = perhitungan(dataPala);
  return res.json(hitung);
});

module.exports = router;
