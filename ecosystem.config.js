module.exports = {
  apps : [{
    name   : "Ningali_server",
    script : "./app.js",
	env : {
	'PORT' : 80,
	'NODE_ENV' : 'production',
	'SECRET_KEY_JWT' :  'hobipuasa',
	'DATABASE_URL' : 'postgresql://postgres:G1taTk8918AqVuiV@db.sjoovrvfwffqeecmpkgi.supabase.co:5432/postgres'
}
  }]
}
