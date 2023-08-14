import db from '../database.js'
import {io} from "../socket.js";


export const sendMessage = async (req, res) => {
    try {
        const { message, tag } = req.body;

        let tagId;

        if (tag.trim() !== '') {
            const query = 'SELECT id FROM tags WHERE tag = $1';
            const result = await db.query(query, [tag]);

            if (result.rows.length > 0) {
                tagId = result.rows[0].id;
            } else {
                const insertQuery = 'INSERT INTO tags (tag) VALUES ($1) RETURNING id, tag';
                const insertResult = await db.query(insertQuery, [tag]);
                tagId = insertResult.rows[0].id;
            }
        }

        const insertMessageQuery = 'INSERT INTO messages (message, tag_id) VALUES ($1, $2) RETURNING *';
        const insertMessageResult = await db.query(insertMessageQuery, [message, tagId]);

        const newMessage = {
            id: insertMessageResult.rows[0].id,
            message: insertMessageResult.rows[0].message,
            tag: tag,
        };

        io.emit('getMessage', newMessage)


        res.json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Error sending message' });
    }
}

export const getTags = async (req, res) => {
    try {
        const query = 'SELECT * FROM tags';
        const result = await db.query(query);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows)
        } else {
            res.status(200).json(result.rows)
        }
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Error sending message' });
    }
}

export const getMessages = async (req, res) => {
    try {
        const query = 'SELECT messages.*, tags.tag FROM messages LEFT JOIN tags ON messages.tag_id = tags.id';
        const result = await db.query(query);

        const messagesWithTags = result.rows.map(row => ({
            id: row.id,
            message: row.message,
            tag: row.tag
        }));

        res.json(messagesWithTags);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
}
