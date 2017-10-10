  function stripslashes(str) {
	return str.replace(/\\'/g,'\'').replace(/\"/g,'"').replace(/\\\\/g,'\\').replace(/\\0/g,'\0');
  }
  function getTableData(table_id, render) {
    var oTable = $(table_id);
    var return_array = [];

    table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
        var data = this.data();
		// data.map(stripslashes)
		// console.log(data[3])
		if(render == 'html'){
			// data[3] = stripslashes(JSON.stringify(data[3]))
		} 

       	return_array.push(data)
    });
    return return_array
  }

  function getTableForm(table_obj) {
	var return_value = []

	table_obj.$('input').each( function() {
		key = $(this).attr('id')
		value = $(this).val()

		return_value.push(value)
	} )

	// return_value[2] = JSON.parse("["+(return_value[2])+"]")
	return return_value
  }

  function formatDataSet(dataSet) {
	var post_pattern = []

    header = ["sequence", "auth_type", "pattern" , "allow_ip", "rule"];


    dataSet.forEach( function( row_val , row_key ) {
    	var row_pattern = {};
    	
    	// row_val.shift()
		row_val.forEach( function( val , key ) {
			if(key != 0) { // Skip sequence field
				row_pattern[header[key]] = (val)
			}
		} )

    	post_pattern.push(row_pattern)
    });

    return post_pattern
  }

  function redrawTable(table_id, dataSet){

    table = $(table_id).DataTable( {
	    data: dataSet ,
	    columns: [
          { title: "sequence"   , className: 'reorder' },
          { title: "auth_type" 	, className: 'reorder' },
          { title: "pattern" 	, className: 'reorder' },
          { title: "allow_ip" 	, className: 'reorder' },
          { title: "rule" 		, className: 'reorder' },
	    ],

	    destroy : true,

		rowReorder: {
			selector: 'tr'
		},
		columnDefs: [
			{ targets: 0, visible: false }
   		]
    } );

  }