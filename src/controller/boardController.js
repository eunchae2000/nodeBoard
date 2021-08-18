const winston = require('winston');
const router = require('../routes/boardRoute');
const boardService = require('../services/boardService');

const logger = winston.createLogger();

/* 1. 게시글 목록 보기 */
exports.BoardList = async(req, res, next) => {
    try{
        let list = await boardService.BoardList();
        return res.render('boardlist',{title:'boardList', list:list});
    }catch(err){
        logger.info(err);
        return res.status(500).json(err)
    }
}
 
/* 2. 선택한 게시글 상세 보기 */
exports.showBoard = async(req, res, next) => {
    let {board_title} = req.params;
    try{
        let detail = await boardService.showBoard(board_title);
        return res.json(detail[0])
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 3. 새로운 게시글 생성 */
exports.insertBoard = async(req, res, next) => {
    let {board_title, board_content, board_writer} = req.params;
    try{
        await boardService.insertBoard(board_title, board_content, board_writer);
        return res.redirect('/write');
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 게시글 생성 페이지 */
exports.createBoard = async(req, res, next) => {
    try{
        return res.render('boardNew');
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 4. 작성한 게시글 수정 */
exports.updateBoard = async(req, res, next) => {
    let {board_title, board_writer, board_content} = req.body;
    let {board_uid} = req.params;
    try{
        await boardService.updateBoard(board_title, board_writer, board_content, board_uid);
        res.redirect('/update')
    }catch(err){
        return res.status(500).json(err)
    }
}

// 게시글 수정 페이지
exports.patchBoard = async(req, res, next) => {
    let {board_uid} = req.params;
    try{
        await boardService.
        res.render('boardUpdate');
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 5. 작성한 게시글 삭제 */
exports.deleteBoard = async(req, res, next) => {
    let {board_uid, board_title, board_writer, board_content} = req.params;
    try{
        let del = await boardService.deleteBoard(board_uid, board_title, board_writer, board_content);
        return res.status(200).json(del[0])
    }catch(err){
        return res.status(500).json(err)
    }
}