import { useState } from "react";

function OrderPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        qty: 1,
    });
    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);

    function validate(values) {
        const e = {};
        if (values.name.trim().length < 2) {
            e.name = "Name too short";
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
            e.email = "Enter a valid email";
        }
        if (Number(values.qty) < 1) {
            e.qty = "Quantity must be at least 1";
        }
        return e;
    }

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const found = validate(form);
        setErrors(found);
        if (Object.keys(found).length === 0) {
            setDone(true);
        }
    }

    if (done) {
        return (
            <div className="panel-wrap">
                <div className="panel">
                    <h2>Thanks, {form.name}!</h2>
                    <p className="lead">Order received. We'll email {form.email} when it's ready.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="panel-wrap">
            <form className="panel" onSubmit={handleSubmit} noValidate>
                <h2>Place Order</h2>
                <p className="lead">Skip the queue - we'll have it ready.</p>

                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="field-error">{errors.name}</p>}
                </div>

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        placeholder="you@my.sliit.lk"
                        value={form.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="field-error">{errors.email}</p>}
                </div>

                <div className="field">
                    <label htmlFor="qty">Quantity</label>
                    <input
                        id="qty"
                        type="number"
                        name="qty"
                        min="1"
                        value={form.qty}
                        onChange={handleChange}
                        aria-invalid={!!errors.qty}
                    />
                    {errors.qty && <p className="field-error">{errors.qty}</p>}
                </div>

                <button type="submit" className="btn btn-dark">Place Order</button>
            </form>
        </div>
    );
}

export default OrderPage;
