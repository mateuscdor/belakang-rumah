const moment = require("moment-timezone");
const fs = require("fs");

moment.tz.setDefault("Asia/Jakarta").locale("id");

let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
let setting = JSON.parse(fs.readFileSync('./config.json'))
const { getLimit, getBalance, cekGLimit } = require("../lib/limit")

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}

exports.allmenu = (sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount) => {
	return `*${setting.botName}*
	
  _*${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}*_

    *Host :* Digital Ocean
    *Prefix :* ( ${prefix} )
    *Tanggal Server :* ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
    *Waktu Server :* ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}

	*Status :* ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Free'}
	*Limit Harian :* ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
	*Limit Game :* ${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}
	*Balance :* $${toCommas(getBalance(sender, balance))}

  *Defaults*
   ${prefix}menu
   ${prefix}owner
   ${prefix}speed
   ${prefix}runtime

  *Converter*
   ${prefix}sticker
   ${prefix}toimg
   ${prefix}tovid

  *Downloader*
   ${prefix}play
   ${prefix}tiktok
   ${prefix}ytmp4
   ${prefix}ytmp3
   ${prefix}ig
   ${prefix}fb
   ${prefix}getvideo
   ${prefix}getmusic
  
  *Random*
   ${prefix}quote
   ${prefix}cecan
   ${prefix}cogan
  
  *Searching*
   ${prefix}lirik
   ${prefix}grupwa
   ${prefix}ytsearch
   ${prefix}pinterest
  
  *Game*
   ${prefix}tictactoe
   ${prefix}delttc
   ${prefix}tebakgambar
  
  *Group*
   ${prefix}linkgrup
   ${prefix}setppgrup
   ${prefix}setnamegc
   ${prefix}setdesc
   ${prefix}group
   ${prefix}revoke
   ${prefix}hidetag

  *Owner Tools*
  > evalcode
  x evalcode-2
  $ executor
   ${prefix}setppbot
   ${prefix}exif
   ${prefix}leave
   ${prefix}addprem
   ${prefix}delprem

  *Other*
   ${prefix}buylimit
   ${prefix}buyglimit
   ${prefix}transfer
   ${prefix}limit
   ${prefix}balance

`
}
