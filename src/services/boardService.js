const boardQuery = require('../query/boardQuery')
const pool = require('../../middleware/pool');

// 게시글 목록 보여주기
exports.BoardList = async() => {
    try{
        let list = await pool.query(boardQuery.BoardList);
        console.log(list);
        return list[0];
    }catch (err){
        console.log(err);
        throw Error(err);
    }
}

// 게시판의 글을 상세보기 가능
exports.showBoard = async(board_title) =>{
    try{
        let detail = await pool.query(boardQuery.showBoard, [board_title]);
        return detail[0]
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

// 새로운 게시글 작성
exports.insertBoard = async(board_title, board_content, board_writer) => {
    try{
        let create = await pool.query(boardQuery.insertBoard, [board_title, board_content, board_writer]);
        return create[0]
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

// 기존 게시글 수정
exports.updateBoard = async(board_title,board_content) => {
    try{
        let update = await pool.query(boardQuery.updateBoard, [board_title, board_content])
        return update[0]
    }catch{
        console.log(err)
        throw Error(err)
    }
}
// 기존 게시글 삭제
exports.deleteBoard = async(board_uid) => {
    try{
        let del = await pool.query(boardQuery.deleteBoard, [board_uid])
        return del[0]
    }catch{
        console.log(err)
        throw Error(err)
    }
}