import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { session, longest_word, first_sentence } = req.body;

    if (!session || !longest_word || !first_sentence) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const { data, error } = await supabase
            .from('sentences')
            .insert([{ session, longest_word, first_sentence }]);

        if (error) throw error;

        res.status(200).json({ message: 'Data saved successfully', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
