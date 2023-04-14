const textarea = document.querySelector('.textarea');
document.getElementById("demo").onclick = () => {

// for testing:
// const database = `0113hajnaka@gmail.com; 03kiss@gmail.com; 05fogazatok-tizszog@icloud.com; 06302412978ritz@gmail.com; 08farkas@gmail.com; 0sclera00@gmail.com; 1001mosoly@gmail.com; 1007urban@gmail.com; 1028nemetheva@gmail.com; 10405germany@gmail.com; 11clauu@gmail.com; 12345imi.vi@gmail.com; 1234energy789@gmail.com; 123hajni@gmail.com; 1289670158@qq.com; 12ervin@citromail.hu; 1319dnk@gmail.com; 17nemcsik@gmail.com; 1956petko@gmail.com; 1956zsuzsanna@indamail.hu; 19730601e@gmail.com; 1981.andraskovacs@gmail.com; 1984jageran@gmail.com; 19panka62@gmail.com; 1juhaszzsolt@gmail.com; 1protabaco@gmail.com;`;


    const withoutSemicolon = textarea.value.replaceAll(";", ","); // replace ";" to ""
    const databaseToArray = withoutSemicolon.split(' '); // take elements in the array
    const data = [];
    // display elements in a column
    databaseToArray.forEach((el, index) => {
        data.push([el]);
        });

        console.log(data);

    // (C1) DUMMY DATA
    // var data = [
    //   ["Joa Doe", "joa@doe.com"],
    //   ["Job Doe", "job@doe.com"],
    //   ["Joe Doe", "joe@doe.com"],
    //   ["Jon Doe", "jon@doe.com"],
    //   ["Joy Doe", "joy@doe.com"]
    // ];

    // (C2) CREATE NEW EXCEL "FILE"
    var workbook = XLSX.utils.book_new(),
        worksheet = XLSX.utils.aoa_to_sheet(data); // a data a tömb az emailekkel
    workbook.SheetNames.push("First"); // ez a munkalap neve
    workbook.Sheets["First"] = worksheet;

    // (C3) TO BINARY STRING
    var xlsbin = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "binary"
    });

    // (C4) TO BLOB OBJECT
    var buffer = new ArrayBuffer(xlsbin.length),
        array = new Uint8Array(buffer);
    for (var i=0; i<xlsbin.length; i++) {
      array[i] = xlsbin.charCodeAt(i) & 0XFF;
    }
    var xlsblob = new Blob([buffer], {type:"application/octet-stream"});
    delete array; delete buffer; delete xlsbin;

    // (C5) "FORCE DOWNLOAD"
    var url = window.URL.createObjectURL(xlsblob),
        anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "emailek.xlsx";
    anchor.click();
    window.URL.revokeObjectURL(url);
    delete anchor;

    // finally empty textarea field
    textarea.value = "";
  };