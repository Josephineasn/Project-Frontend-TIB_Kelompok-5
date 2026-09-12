var jenisBangunDatar = document.getElementById('jenisBangunDatar');
var inputAngka = document.getElementById('inputAngka');
var btnHitung = document.getElementById('btnHitung');
var btnReset = document.getElementById('btnReset');

var jawaban = document.getElementById('jawaban');
var namaBangunDatar = document.getElementById('namaBangunDatar');
var outputLuas = document.getElementById('outputLuas');
var outputKeliling = document.getElementById('outputKeliling');
var outputRumusLuas = document.getElementById('outputRumusLuas');
var outputRumusKeliling = document.getElementById('outputRumusKeliling');

var daftarBangun = {
    persegi: {
        nama: 'Persegi / Bujur Sangkar',
        inputs: [{ id: 'sisi', label: 'Panjang Sisi (s)' }],
        hitung: function(val) {
            var s = val.sisi;
            return {
                luas: s * s,
                keliling: 4 * s,
                stepL: s + ' × ' + s,
                stepK: '4 × ' + s
            };
        }
    },
    persegiPanjang: {
        nama: 'Persegi Panjang',
        inputs: [
            { id: 'panjang', label: 'Panjang (p)' },
            { id: 'lebar', label: 'Lebar (l)' }
        ],
        hitung: function(val) {
            var p = val.panjang;
            var l = val.lebar;
            return {
                luas: p * l,
                keliling: 2 * (p + l),
                stepL: p + ' × ' + l,
                stepK: '2 × (' + p + ' + ' + l + ')'
            };
        }
    },
    jajaranGenjang: {
        nama: 'Jajaran Genjang',
        inputs: [
            { id: 'alas', label: 'Alas (a)' },
            { id: 'miring', label: 'Sisi Miring (b)' },
            { id: 'tinggi', label: 'Tinggi (t)' }
        ],
        hitung: function(val) {
            return {
                luas: val.alas * val.tinggi,
                keliling: 2 * (val.alas + val.miring),
                stepL: val.alas + ' × ' + val.tinggi,
                stepK: '2 × (' + val.alas + ' + ' + val.miring + ')'
            };
        }
    },
    segitigaSiku: {
        nama: 'Segitiga Siku-Siku',
        inputs: [
            { id: 'alas', label: 'Alas (a)' },
            { id: 'tinggi', label: 'Tinggi (t)' }
        ],
        hitung: function(val) {
            var a = val.alas;
            var t = val.tinggi;
            var c = Math.sqrt((a * a) + (t * t));
            return {
                luas: 0.5 * a * t,
                keliling: a + t + c,
                stepL: '½ × ' + a + ' × ' + t,
                stepK: a + ' + ' + t + ' + ' + c.toFixed(2) + ' (sisi miring c)'
            };
        }
    },
    segitigaSamaKaki: {
        nama: 'Segitiga Sama Kaki',
        inputs: [
            { id: 'alas', label: 'Alas (a)' },
            { id: 'kaki', label: 'Sisi Kaki (b)' }
        ],
        hitung: function(val) {
            var a = val.alas;
            var b = val.kaki;
            if (b <= a / 2) {
                alert('Panjang kaki harus lebih besar dari setengah alasnya (b > a/2)!');
                return null;
            }
            var t = Math.sqrt((b * b) - Math.pow(a / 2, 2));
            return {
                luas: 0.5 * a * t,
                keliling: a + (2 * b),
                stepL: '½ × ' + a + ' × ' + t.toFixed(2) + ' (tinggi t)',
                stepK: a + ' + (2 × ' + b + ')'
            };
        }
    },
    segitigaSamaSisi: {
        nama: 'Segitiga Sama Sisi',
        inputs: [{ id: 'sisi', label: 'Panjang Sisi (s)' }],
        hitung: function(val) {
            var s = val.sisi;
            return {
                luas: (Math.sqrt(3) / 4) * Math.pow(s, 2),
                keliling: 3 * s,
                stepL: '(√3 / 4) × ' + s + '²',
                stepK: '3 × ' + s
            };
        }
    },
    belahKetupat: {
        nama: 'Belah Ketupat',
        inputs: [
            { id: 'd1', label: 'Diagonal 1 (d1)' },
            { id: 'd2', label: 'Diagonal 2 (d2)' }
        ],
        hitung: function(val) {
            var d1 = val.d1;
            var d2 = val.d2;
            var s = Math.sqrt(Math.pow(d1 / 2, 2) + Math.pow(d2 / 2, 2));
            return {
                luas: 0.5 * d1 * d2,
                keliling: 4 * s,
                stepL: '½ × ' + d1 + ' × ' + d2,
                stepK: '4 × ' + s.toFixed(2) + ' (sisi s)'
            };
        }
    },
    trapesium: {
        nama: 'Trapesium Sama Kaki',
        inputs: [
            { id: 'a', label: 'Sisi Atas (a)' },
            { id: 'b', label: 'Sisi Bawah (b)' },
            { id: 'tinggi', label: 'Tinggi (t)' }
        ],
        hitung: function(val) {
            var a = val.a;
            var b = val.b;
            var t = val.tinggi;
            var delta = Math.abs(b - a) / 2;
            var kaki = Math.sqrt((delta * delta) + (t * t));
            return {
                luas: 0.5 * (a + b) * t,
                keliling: a + b + (2 * kaki),
                stepL: '½ × (' + a + ' + ' + b + ') × ' + t,
                stepK: a + ' + ' + b + ' + 2 × ' + kaki.toFixed(2) + ' (kaki miring)'
            };
        }
    },
    lingkaran: {
        nama: 'Lingkaran',
        inputs: [{ id: 'r', label: 'Jari-Jari (r)' }],
        hitung: function(val) {
            var r = val.r;
            return {
                luas: Math.PI * r * r,
                keliling: 2 * Math.PI * r,
                stepL: 'π × ' + r + '²',
                stepK: '2 × π × ' + r
            };
        }
    },
    layangLayang: {
        nama: 'Layang-Layang',
        inputs: [
            { id: 'd1', label: 'Diagonal 1 (d1)' },
            { id: 'd2', label: 'Diagonal 2 (d2)' },
            { id: 's1', label: 'Sisi Pendek (a)' },
            { id: 's2', label: 'Sisi Panjang (b)' }
        ],
        hitung: function(val) {
            return {
                luas: 0.5 * val.d1 * val.d2,
                keliling: 2 * (val.s1 + val.s2),
                stepL: '½ × ' + val.d1 + ' × ' + val.d2,
                stepK: '2 × (' + val.s1 + ' + ' + val.s2 + ')'
            };
        }
    }
};

// Ini fungsi buat minimal 0, tidak minus
function formKalku() {
    inputAngka.innerHTML = '';
    jawaban.style.display = 'none';

    var key = jenisBangunDatar.value;
    var data = daftarBangun[key];
    var teksHtml = '';

    for (var i = 0; i < data.inputs.length; i++) {
        var item = data.inputs[i];
        teksHtml += '<p>';
        teksHtml += '<label for="' + item.id + '">' + item.label + ' (cm):</label><br />';
        // ini biar nilainya gabisa minus
        teksHtml += '<input type="number" id="' + item.id + '" step="any" min="0" placeholder="Masukkan Angka">';
        teksHtml += '</p>';
    }

    inputAngka.innerHTML = teksHtml;
}

jenisBangunDatar.addEventListener('change', formKalku);

// tombol reset
btnReset.addEventListener('click', function() {
    jawaban.style.display = 'none';
    formKalku();
});

// tombol hitung
btnHitung.addEventListener('click', function() {
    var key = jenisBangunDatar.value;
    var data = daftarBangun[key];
    var nilaiInput = {};

    for (var i = 0; i < data.inputs.length; i++) {
        var id = data.inputs[i].id;
        var el = document.getElementById(id);
        var val = parseFloat(el.value);

        // tidak boleh kosong, tidak boleh minus, tidak boleh 0
        if (isNaN(val) || val <= 0) {
            alert('Nilai untuk ' + data.inputs[i].label + ' tidak boleh minus atau 0!');
            return;
        }
        nilaiInput[id] = val;
    }

    var hasil = data.hitung(nilaiInput);
    if (!hasil) return;

    // Menampilkan hasil
    namaBangunDatar.innerHTML = data.nama;
    outputLuas.innerHTML = hasil.luas.toFixed(2);
    outputKeliling.innerHTML = hasil.keliling.toFixed(2);
    outputRumusLuas.innerHTML = hasil.stepL;
    outputRumusKeliling.innerHTML = hasil.stepK;

    jawaban.style.display = 'block';
});

// Inisialisasi awal
formKalku();