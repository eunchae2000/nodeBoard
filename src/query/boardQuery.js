exports.BoardList = 'select board_uid, board_title, board_writer from boardDb';
exports.showBoard = 'select * from boardDb where board_uid = ?';
exports.insertBoard = 'insert into boardDb(board_title, board_writer, board_content) values(?, ?, ?)';
exports.updateBoard = 'update boardDb set board_title=?, board_content=?, board_writer=? where board_uid=?';
exports.deleteBoard = 'delete from boardDb where board_uid=?';