const winston = require('winston');
const router = require('../routes/boardRoute');
const boardService = require('../services/boardService');

const logger = winston.createLogger();

/* 1. 게시글 목록 보기 */
exports.BoardList = async(req, res, next) => {
    try{
        // DB의 값을 리스트로 만들어서 목록을 보여줌
        let list = await boardService.BoardList();
        // view폴더의 boardlist 파일을 만들어서 연결시켜줌
        return res.render('boardlist',{title:'boardList', list:list});
    }catch(err){
        logger.info(err);
        return res.status(500).json(err)
    }
}
 
/* 2. 선택한 게시글 상세 보기 */
exports.showBoard = async(req, res, next) => {

    let {board_uid} = req.params;
    try{
        // board_title 값을 통해서 해당 title에 대한 데이터를 보여줌.
        let detail = await boardService.showBoard(board_uid);
        console.log(detail);
        // boardDetail ejs파일과 연결.
        res.render('boardDetail', {detail:detail});
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 3. 새로운 게시글 생성 */
exports.insertBoard = async(req, res, next) => {
    // borad_title, board_content, board_writer의 값의 속성을 params로 받아옴.
    let {board_title, board_content, board_writer} = req.body;
    try{
        await boardService.insertBoard(board_title, board_content, board_writer);
        // 웹주소 /write를 추가하여 보여줌
        // return res.redirect('/board/write');
        return res.redirect('/board/list');
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 게시글 생성 페이지 */
exports.createBoard = async(req, res, next) => {
    try{
        // 게시글 생성에 대한 ejs 파일을 연결
        return res.render('boardNew');
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 4. 작성한 게시글 수정 */
exports.updateBoard = async(req, res, next) => {
    let {board_title, board_content, board_writer} = req.body;
    let {board_uid} = req.params;
    try{
        await boardService.updateBoard(board_title, board_content, board_uid, board_writer);
        res.redirect('/board/read/:board_uid')
    }catch(err){
        return res.status(500).json(err)
    }
}

// 게시글 수정 페이지
exports.patchBoard = async(req, res, next) => {
    let {board_uid} = req.params;
    try{
        let detail = await boardService.showBoard(board_uid);
        res.render('boardUpdate', {detail: detail});
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 5. 작성한 게시글 삭제 */
exports.deleteBoard = async(req, res, next) => {
    let {board_uid} = req.params;
    try{
        let del = await boardService.deleteBoard(board_uid);
        return res.redirect('/board/list', {del:del})
    }catch(err){
        return res.status(500).json(err)
    }
}