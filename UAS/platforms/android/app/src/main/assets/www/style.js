
function loadPageReg(){
	$('#test-load').html('');
  $.ajax({
      type : 'post',
      url : baseURL,
      data : {fungsi:'selectNormal'},
      dataType : 'json',
      success : function(response){
          var a;
          for (var i = 0; i < response.length; i++) {
            a=1;
            if (response[i].nama != 'Farid Darmaji') {   
              a = a + i;
              $html = '<tr><td>'+a+'</td><td>'+response[i].NIM+'</td><td>'+response[i].nama+'<div><div id="box-tb-hide-'+i+'" hidden=""><label id="nim-'+i+'">'+response[i].NIM+'</label><label id="nama-'+i+'">'+response[i].nama+'</label></div><div id="box-show-'+i+'" class="box-show-all"><div class="box-progdi box-datatable"><div class="div-datatable datatable"><label id="matkul-'+i+'">'+response[i].mata_kuliah+'</lebel></div></div><div class="box-kelas box-datatable"><div class="div-datatable datatable"><label id="kelas-'+i+'">'+response[i].waktu+'</label></div></div><div class="box-email box-datatable"><div class="div-datatable datatable"><label id="email-'+i+'">'+response[i].email+'</label></div></div></div></div></td><td class="i-aksi"><span class="icon-button"><i class="fa fa-info-circle icon-aksi infoshow-all" id="infoShow-'+i+'" aria-hidden="true" onclick="showMore('+i+')"></i><i class="fa fa-times-circle icon-aksi infohide-all" id="infoHide-'+i+'" aria-hidden="true" onclick="defaultSetting()"></i><i class="fa fa-trash-o icon-aksi aksi-all" id="aksihapus-'+i+'" aria-hidden="true" onclick="hapus('+response[i].NIM+')"></i><i class="fa fa-pencil-square-o icon-aksi aksi-all" id="aksiubah-'+i+'" aria-hidden="true" data-toggle="modal" data-target="#box-edit" onclick="boxUbah('+i+')"></i></span></td></tr>';
              $('#test-load').html($('#test-load').html()+$html);
            }
          }
          defaultSetting();
      }
  });
}

function loadMore(){
  $('#cache-nim').html('');
  $('#cache-nama').html('');
  $('#cache-nim').html(getCookie()[0]);
  $('#cache-nama').html(getCookie()[1]);
}

function showPopUp(index){
	alert(index);
}

function login(){
	var nim = $('#nim').val();
	var email = $('#email').val();
	var kondisi = ' NIM='+nim+' and email="'+email+'"';
	$.ajax({
		type : 'post',
        url : baseURL,
        data : {fungsi:'selectWhere', kondisi:kondisi},
        dataType : 'json',
        success : function(response){
          console.log(response.status);
        	if (response.status) {
            document.cookie = 'nim='+response.nim+'|nama='+response.nama+'|mata_kuliah='+response.mata_kuliah+'|email='+response.email+'|waktu='+response.waktu;
            $('#konten').load('./homepage.html');
        	}
        	else{
        		alert('Belum Terdaftar!');
        	}
        }	
	})
}

function logout(){
  document.cookie = 'nim=|nama=|mata_kuliah=|email=|waktu=';
  $('#konten').load('./index.html');
}

function cekLogin(){
  var nim = getCookie()[0];
  $.each(getCookie(), function(index, data){
    console.log(index+', '+data);
  });
  if ((nim == undefined) || (nim == '')){
    $('#konten').load('./login.html');
  }
}

function tambah(){
	var form = $('#form-add');
	var data = $(form).serialize();
  var cookie = getCookie();
	data = data+'&fungsi=insertNormal';

	$.ajax({
		type : 'post',
		url : baseURL,
		data : data,
		dataType : 'json',
		success : function(response){
			if (response.status) {
        alert('Data telah disimpan.');  
        alert('Silahkan Login.');
			}
			else{
        alert('Data Gagal Disimpan, harap hubungi developer!');
			}
      clearInput();
      location.href='./index.html';
		}
	})
}

function lapor(){
  var form = $('#form-lapor');
  var data = $(form).serialize();
  var cookie = getCookie();
  data = data+'&fungsi=laporan';
  cekLogin();
  $.ajax({
    type : 'post',
    url : baseURL,
    data : data,
    dataType : 'json',
    success : function(response){
      console.log(response);
      if (response.status) {
        alert('Data telah disimpan.');  
      }
      else{
        alert('Data Gagal Disimpan, harap hubungi developer!');
      }
      clearInput();
      location.href='./index.html';
    }
  })
}


function ubah(){
  var form = $('#form-edit');
  var data = $(form).serialize();
  var nimDEF = $('#nim-default').val();
  var emailDEF = $('#email-default').val();
  var nim = $('#nim-edit').val();
  var nama = $('#nama-edit').val();
  var mata_kuliah = $('#mata_kuliah-edit').val();
  var waktu = getCookie()[4];
  var email = $('#email-edit').val();
  var kondisi = ' NIM='+nimDEF+' and email="'+emailDEF+'"';
  var self = $('#ubahstat').html();
  data = data+'&fungsi=updateNormal&kondisi='+kondisi;
  $.ajax({
    type : 'post',
    url : baseURL,
    data : data,
    dataType : 'json',
    success : function(response){
      console.log(response);
      if (response.status) {
        alert('Data telah dirubah.');
        if (self == 'true') {
          document.cookie = 'nim='+nim+'|nama='+nama+'|mata_kuliah='+mata_kuliah+'|email='+email+'|waktu='+waktu;
        }
      }
      else{
        alert('Data Gagal Dirubah, harap hubungi developer!');
      }
      clearInput();
      location.href='./index.html';
    }
  })
}

function hapus(nim){
  var kondisi = ' NIM='+nim;
  $.ajax({
    type : 'post',
    url : baseURL,
    data : {fungsi:'deleteWhere', kondisi:kondisi},
    dataType : 'json',
    success : function(response){
      if (response.status) {
        alert('Nomor Induk '+nim+' terhapus.');
      }
      else{
        alert('Gagal Mengahapus Nomor Induk '+nim+'!');
      }
      clearInput();
      location.href='./index.html';
    }
  })
}

function boxUbah(index){
  var nim, nama, mata_kuliah, waktu, email, self;
  defaultSetting();closeNav();
  if (index == 'myself') {
    nim = getCookie()[0];
    nama = getCookie()[1];
    mata_kuliah = getCookie()[2];
    email = getCookie()[3];
    self = 'true';
  }
  else{
    nim = $('#nim-'+index).html();
    nama = $('#nama-'+index).html();
    mata_kuliah = $('#matkul-'+index).html();
    email = $('#email-'+index).html();
    self = 'false';
  }
  $('#ubahstat').html(self);
  $('#nim-default').val(nim);
  $('#email-default').val(email);
  $('#nim-edit').val(nim);
  $('#nama-edit').val(nama);
  $('#mata_kuliah-edit').val(mata_kuliah);
  $('#email-edit').val(email);
}

function boxLapor(index){
  var nim, nama;
  nim = getCookie()[0];
  nama = getCookie()[1];
  $('#nim-lapor').val(nim);
  $('#nama-lapor').val(nama);
}

function clearInput(){
  $('.form-control').val('');
  $('#mata_kuliah-add').val('mobile');
}

function showMore(index){
  defaultSetting();
  $('#infoShow-'+index).hide();
  $('#infoHide-'+index).show();
  $('#box-show-'+index).show();
  if (getCookie()[1] == 'Farid Darmaji') {
    //alert(getCookie()[1]);
    $('#aksihapus-'+index).show();
    $('#aksiubah-'+index).show();
  }
}

function defaultSetting(){
  $('.box-show-all').hide();
  $('.infohide-all').hide();
  $('.infoshow-all').show();
  $('.aksi-all').hide();
  if (getCookie()[1] == 'Farid Darmaji') {
    //$('.btn-tambah').show();
    document.getElementById("btn-tambah").style.visibility = "visible";
  }
}

function getCookie(){
  var generate = [];
  var arrayCook = document.cookie.split('|');
  for (var i=0; i<arrayCook.length; i++) {
    arrayCook[i] = arrayCook[i].split('=');
    generate[i] = arrayCook[i][1];
  }
  return generate;
}

function onlyNumeric(char){
  var val = (char.which) ? char.which : event.keyCode
  if (val > 31 && (val < 48 || val > 57))
    return false;
  return true;
}

//////////////////////////////////////
//////////////////////////////////////
//style page
function openNav() {
  document.getElementById("mySidenav").style.width = "60%";
  $('#myBoxback').show();
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0px";
  $('#myBoxback').hide();
}