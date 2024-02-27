const mongoose  = require('mongoose');

const KorisnikModel = new mongoose.Schema(
    {
        email:{ type: String },
        password:{ type: String }
    }
)

const Korisnik = mongoose.model('Korisnik', KorisnikModel, 'korisnici');

module.exports = Korisnik;