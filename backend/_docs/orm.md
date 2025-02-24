# orm examples

read

```php
Events::all();
```

```sql
SELECT * FROM events;
```

create

```php
$event = new event();
$event->title = 'my first event';
$event->content = 'lorem ipsum';
$event->save();
```

```sql
INSERT INTO events (title, content)
VALUES ('my first event', 'lorem ipsum');
```

update

```php
$event = event::find(1);
$event->title = 'updated event';
$event->save();
```

```sql
UPDATE events
SET title = 'updated event'
WHERE id = 1;
```

delete

```php
$event = event::find(1);
$event->delete();
```

```sql
DELETE FROM events
WHERE id = 1;
```
