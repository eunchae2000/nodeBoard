const boardService = require('../services/boardService');

/* 1. 게시글 목록 보기 */
// router.get('/', function(req, res, next){
//     res.redirect('/board/list');
// })
exports.getBoard = async(req, res, next) => {
    let {board_uid} = req.params;
    try{
        let rows = await boardService.getBoard(board_uid);
        return res.json(rows[0])
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 2. 선택한 게시글 상세 보기 */
exports.showBoard = async(req, res, next) => {
    let {board_title} = req.params;
    try{
        let rows = await boardService.showBoard(board_title);
        return res.json(rows[0])
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 3. 새로운 게시글 생성 */
exports.insertBoard = async(req, res, next) => {
    let {board_title, board_content, board_writer} = req.params;
    try{
        let rows = await boardService.insertBoard(board_title, board_content, board_writer);
        return res.status(200).json(rows[0])
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 4. 작성한 게시글 수정 */
exports.updateBoard = async(req, res, next) => {
    let {board_title, board_content} = req.params;
    try{
        let rows = await boardService.updateBoard(board_title, board_content);
        return res.status(200).json(rows[0])
    }catch(err){
        return res.status(500).json(err)
    }
}

/* 5. 작성한 게시글 삭제 */
exports.deleteBoard = async(req, res, next) => {
    let {board_uid, board_title, board_writer, board_content} = req.params;
    try{
        let rows = await boardService.deleteBoard(board_uid, board_title, board_writer, board_content);
        return res.status(200).json(rows[0])
    }catch(err){
        return res.status(500).json(err)
    }

}