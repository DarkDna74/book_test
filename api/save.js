import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function login() {
    try {
       const { data, error } = await supabase.auth.signIn({
  email: "tommaso.guglielmi@gmail.com",
  password: "XdragoSupa21!"
});

        if (error) {
            console.error("Errore di login:", error.message);
            return null;
        } 
        console.log("Login riuscito:", data.user);
        return data.user;
    } catch (err) {
        console.error("Errore:", err);
        return null;
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
console.log(req.body); 
    const user = await login();  // Aspetta che il login sia completato

    if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
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

        return res.status(200).json({ message: 'Data saved successfully', data });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
