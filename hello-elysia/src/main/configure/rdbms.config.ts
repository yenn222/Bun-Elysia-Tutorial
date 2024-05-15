import Database from "bun:sqlite";

let rdbms: Database;

const open = () => {
  // rdbms = new Database("Bun.file(sqlite.db)");
  rdbms = new Database(":memory:");
};

const close = () => {
  rdbms.close();
};

const createTable = () => {
  return `CREATE TABLE IF NOT EXISTS todo(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    status TEXT)`;
};

const insertDummy = () => {
  return `INSERT INTO todo (title, status) 
    VALUES ('First Todo', 'pending'), 
    ('Second Todo', 'done'),
    ('Third Todo', 'pending'),
    ('Fourth Todo', 'progress'),
    ('Fifth Todo', 'pending')`;
};

const initialize = () => {
  //실제에서는 initialize는 파일 외부로 나가지 X
  //테스트를 위한 세팅임.
  runCommand(createTable());
  runCommand(insertDummy());
};

const runCommand = (query: string) => {
  return rdbms.query(query).values(); //쿼리를 실행하고 결과를 반환
};

const getQuery = (query: string) => {
  return rdbms.query(query).get(); //하나를 찾을 때 사용하는 sqlite
};

const allQuery = (query: string) => {
  return rdbms.query(query).all(); //전체를 찾을 때 사용하는 sqlite
};

export const RdbmsConfig = {
  open,
  close,
  initialize,
  getQuery,
  allQuery,
};
