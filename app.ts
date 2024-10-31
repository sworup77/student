import { Student } from "./entities/Student";

const appDataSource = new DataSource({
   type: "postgres",
   host: "localhost",
   port: 5432,
   username: "postgres",
   password: "hello",
   database: "typeorm_db",
   entities: [User, Student],
   synchronize: true,
   logging: true
});

   
   
   import { Router } from "express";
import { Student } from "./entities/Student";

const studentRouter = Router();

studentRouter.get("/", async (req, res) => {
   const students = await Student.find();
   res.json(students);
});

studentRouter.post("/", async (req, res) => {
   const { firstName, lastName, rollNumber } = req.body;
   const newStudent = Student.create({ firstName, lastName, rollNumber });
   await newStudent.save();
   res.json(newStudent);
});

studentRouter.get("/:id", async (req, res) => {
   const student = await Student.findOne({ where: { id: parseInt(req.params.id) } });
   if (!student) return res.status(404).json({ message: "Student not found" });
   res.json(student);
});

studentRouter.put("/:id", async (req, res) => {
   const { firstName, lastName, rollNumber } = req.body;
   const student = await Student.findOne({ where: { id: parseInt(req.params.id) } });
   if (!student) return res.status(404).json({ message: "Student not found" });

   student.firstName = firstName;
   student.lastName = lastName;
   student.rollNumber = rollNumber;
   await student.save();
   res.json(student);
});

studentRouter.delete("/:id", async (req, res) => {
   const student = await Student.findOne({ where: { id: parseInt(req.params.id) } });
   if (!student) return res.status(404).json({ message: "Student not found" });

   await student.remove();
   res.json({ message: "Student deleted successfully" });
});
