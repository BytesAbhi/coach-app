<?php

namespace App\Filament\Resources\CoachLoginResource\Pages;

use App\Filament\Resources\CoachLoginResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewCoachLogin extends ViewRecord
{
    protected static string $resource = CoachLoginResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
