const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Jam = require('../models/jam');
const ObjectId = mongoose.Types.ObjectId;
const middlewares = require('../middlewares/middlewares');
// const User = require('../models/user');

// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

/* ------------ Jam Index ----------------- */

router.get('/', middlewares.requireUser, (req, res, next) => {
  const objId = mongoose.Types.ObjectId(req.session.currentUser._id);
  Jam.find()
    .then(jams => {
      for (let i = 0; i < jams.length; i++) {
        if (jams[i].owner.equals(objId)) {
          jams[i].isMyJam = true;
        } else {
          jams[i].isMyJam = false;
        }
        for (let j = 0; j < jams[i].attendees.length; j++) {
          if (jams[i].attendees[j].equals(objId)) {
            jams[i].isAttending = true;
          } else {
            jams[i].isAttending = false;
          }
          // oculta el boton de borrar si no es propietario + logica en la vista
        }
      }
      const data = {
        jams: jams,
        page: 'jams',
        menuId: 'jams',
        currentUser: req.session.currentUser
      };
      res.render('jams/index', data);
    })
    .catch(next);
});

/* --------- Add a Jam ---------- */

router.get('/add', middlewares.requireUser, (req, res, next) => {
  res.render('jams/add', { page: 'jams', menuId: 'jams' });
});

router.post('/add', middlewares.requireUser, (req, res, next) => {
  const { title, date, description, city, instruments, style } = req.body;
  const owner = req.session.currentUser._id;

  if (!title || !date || !city || !description || !style) {
    return res.redirect('/jams/add');
  } else {
    const jam = new Jam({ owner, title, date, description, city, instruments, style });
    jam.save()
      .then(() => {
        return res.redirect('/jams');
      })
      .catch(next);
  }
});

/* ----------- Atendees Jam ------------ */

router.post('/:id/attend', middlewares.requireUser, (req, res, next) => {
  const jamId = req.params.id;
  const userId = req.session.currentUser._id;
  Jam.findById(jamId)
    .then(jam => {
      const position = jam.attendees.indexOf(ObjectId(userId));

      if (position < 0) {
        jam.attendees.push(ObjectId(userId));
        req.flash('success', 'Added to attendees');
      } else {
        jam.attendees.splice(position, 1);
        req.flash('danger', 'Removed from attendees');
      }
      jam.save()
        .then((success) => {
          res.redirect('/jams');
        })
        .catch(next);
    })
    .catch(next);
});

router.post('/:id/attend', middlewares.requireUser, (req, res, next) => {
  const jamId = req.params.id;
  const userId = req.session.currentUser._id;
  Jam.findById(jamId)
    .then(jam => {
      const position = jam.attendees.indexOf(ObjectId(userId));
      let isAttending = false;
      if (position < 0) {
        jam.attendees.push(ObjectId(userId));
        req.flash('success', 'Added to attendees');
        isAttending = true;
      } else {
        jam.attendees.splice(position, 1);
        req.flash('danger', 'Removed from attendees');
        isAttending = false;
      }
      jam.save()
        .then((success) => {
          res.redirect('/jams');
        })
        .catch(next);
    })
    .catch(next);
});

/* ----------- Edit Jam ------------ */

router.get('/:id/edit', middlewares.requireUser, (req, res, next) => {
  const id = req.params.id;
  Jam.findById(id)
    .then(jam => {
      res.render('jams/edit', { jam: jam });
    })
    .catch(error => {
      // console.log('error', error);
      next(error);
    });
});

/* ----------- Edit Jam ------------ */

router.post('/:id/save', middlewares.requireUser, (req, res, next) => {
  const id = req.params.id;
  const updateJam = req.body;
  console.log(updateJam);
  console.log(id);

  Jam.findByIdAndUpdate(id, updateJam)
    .then((jam) => {
      res.redirect('/jams');
    })
    .catch(next);
});

router.post('/:id', middlewares.requireUser, (req, res, next) => {
  const id = req.params.id;
  const jam = req.body;
  Jam.findByIdandUpdate(id, jam)
    .then(jam => {
      res.redirect('/jams');
    })
    .catch(error => {
      console.log('error', error);
      next(error);
    });
});

/* --------- Delete a Jam ---------- */

// router.post('/:id/delete', middlewares.requireUser, (req, res, next) => {
//   const idObjUser = mongoose.Types.ObjectId(res.session.currentUser._id);
//   const id = req.params.id;
//   Jam.findById(id)
//     .then(jam => {
//       const isOwner = jam.owner.indexOf(res.session.currentUser._id);
//       console.log('isOwner', isOwner);
//       if (isOwner >= 0) {
//         Jam.findByIdAndDelete(id)
//           .then(() => {
//             req.flash('info', 'Borrado correctamente');
//             res.redirect('/jams');
//           })
//           .catch(next);
//       } else {
//         req.flash('info', 'Borrado correctamente');
//         res.redirect('/jams');
//       }
//     })
//     .catch(next);
// });

router.post('/:id/delete', middlewares.requireUser, (req, res, next) => {
  // const idUser = res.session.currentUser._id;

  const id = req.params.id;
  // console.log('user', idUser);
  Jam.findByIdAndDelete(id)
    .then(() => {
      req.flash('info', 'Borrado correctamente');
      res.redirect('/jams');
    })
    .catch(error => {
      console.log('error', error);
      next(error);
    });
});

router.get('/:id', middlewares.requireUser, (req, res, next) => {
  const id = req.params.id;
  const jam = req.body;
  Jam.findById(id, jam)
    .then(jam => {
      res.render('jams/jaminfo', { jam: jam });
    })
    .catch(error => {
      console.log('error', error);
      next(error);
    });
});

module.exports = router;
